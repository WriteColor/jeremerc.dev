import { NextResponse } from "next/server";
import { rateLimit } from "../../../utils/rateLimit";
import { logContactMessage } from "../../../utils/db";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
    const limitRes = await rateLimit(ip, "contact-post", 3, 300); // 3 messages per 5 mins
    if (!limitRes.success) {
      return NextResponse.json({ error: "Límite de mensajes superado. Intenta de nuevo en unos minutos." }, { status: 429 });
    }

    const { name, email, message, token } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    if (!token) {
      return NextResponse.json({ error: "Seguridad Turnstile no verificada" }, { status: 400 });
    }

    // Validate with Cloudflare Turnstile Siteverify API
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY || "",
        response: token,
      }),
    });

    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return NextResponse.json({ error: "Validación anti-bot fallida" }, { status: 403 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json({ error: "Resend API Key no configurada en el servidor." }, { status: 500 });
    }

    const contactEmail = process.env.CONTACT_EMAIL || "contacto@jeremerc.dev";
    const senderEmail = process.env.SENDER_EMAIL || "no-reply@jeremerc.dev";

    const sendEmailViaResend = async (payload: {
      from: string;
      to: string;
      reply_to?: string;
      subject: string;
      html: string;
    }) => {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Resend API error (${response.status}): ${errText}`);
      }

      return await response.json();
    };

    const fontStack = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

    // 1. Email HTML for owner copy
    const ownerMailHtml = `
      <div style="font-family: ${fontStack}; background-color: #F4F4F7; padding: 30px; color: #000000; min-height: 100%;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 4px solid #000000; box-shadow: 8px 8px 0px 0px #000000; padding: 25px;">
          
          <!-- Header Banner -->
          <div style="background-color: #00E5FF; border: 3px solid #000000; padding: 15px; margin-bottom: 25px; box-shadow: 4px 4px 0px 0px #000000;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td width="55" valign="middle">
                  <img src="https://jeremerc.dev/avatar.png" width="45" height="45" style="border: 2.5px solid #000000; box-shadow: 2px 2px 0px 0px #000000; display: block;" />
                </td>
                <td valign="middle" style="padding-left: 12px;">
                  <h1 style="margin: 0; font-size: 20px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px; color: #000000; line-height: 1.1;">
                    Nuevo Mensaje de Contacto
                  </h1>
                </td>
              </tr>
            </table>
          </div>

          <p style="font-size: 13px; font-weight: 700; color: #55555B; margin-bottom: 20px; text-transform: uppercase;">
            Has recibido una consulta desde el formulario del portafolio.
          </p>

          <!-- Client Details Box -->
          <div style="border: 3px solid #000000; padding: 15px; background-color: #FFF275; margin-bottom: 20px; box-shadow: 4px 4px 0px 0px #000000;">
            <div style="margin-bottom: 10px;">
              <span style="font-weight: 900; text-transform: uppercase; font-size: 10px; display: block; color: #55555B;">Nombre del remitente:</span>
              <span style="font-size: 14px; font-weight: 700; color: #000000;">${name}</span>
            </div>
            <div>
              <span style="font-weight: 900; text-transform: uppercase; font-size: 10px; display: block; color: #55555B;">Correo de contacto:</span>
              <span style="font-size: 14px; font-weight: 700; color: #000000;">${email}</span>
            </div>
          </div>

          <!-- Message Box -->
          <div style="border: 3px solid #000000; padding: 20px; background-color: #FFFFFF; margin-bottom: 25px; box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.15);">
            <span style="font-weight: 900; text-transform: uppercase; font-size: 10px; display: block; color: #55555B; margin-bottom: 10px;">Mensaje enviado:</span>
            <p style="margin: 0; font-size: 13px; line-height: 1.6; font-weight: 600; white-space: pre-wrap; color: #000000;">${message}</p>
          </div>

          <!-- Footer Accent -->
          <div style="border-top: 2px dashed #000000; padding-top: 15px; text-align: center; font-size: 10px; font-weight: 700; text-transform: uppercase; color: #55555B;">
            © 2026 Jeremerc. Enviado vía ${senderEmail}
          </div>

        </div>
      </div>
    `;

    // 2. Email HTML for client confirmation
    const userMailHtml = `
      <div style="font-family: ${fontStack}; background-color: #F4F4F7; padding: 30px; color: #000000; min-height: 100%;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 4px solid #000000; box-shadow: 8px 8px 0px 0px #000000; padding: 25px;">
          
          <!-- Header Banner -->
          <div style="background-color: #FF4E88; border: 3px solid #000000; padding: 15px; margin-bottom: 25px; box-shadow: 4px 4px 0px 0px #000000;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td width="55" valign="middle">
                  <img src="https://jeremerc.dev/avatar.png" width="45" height="45" style="border: 2.5px solid #000000; box-shadow: 2px 2px 0px 0px #000000; display: block;" />
                </td>
                <td valign="middle" style="padding-left: 12px;">
                  <h1 style="margin: 0; font-size: 20px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px; color: #ffffff; line-height: 1.1;">
                    ¡Hola ${name}!
                  </h1>
                </td>
              </tr>
            </table>
          </div>

          <p style="font-size: 13px; font-weight: 700; line-height: 1.5; color: #000000; margin-bottom: 20px;">
            He recibido tu mensaje correctamente. Estaré respondiendo a tu propuesta en breve.
          </p>

          <!-- Copy of what they sent -->
          <div style="border: 3px solid #000000; padding: 15px; background-color: #F4F4F7; margin-bottom: 20px; box-shadow: 4px 4px 0px 0px #000000;">
            <span style="font-weight: 900; text-transform: uppercase; font-size: 10px; display: block; color: #55555B; margin-bottom: 8px;">Copia del mensaje enviado:</span>
            <p style="margin: 0; font-size: 12px; line-height: 1.5; font-weight: 600; color: #55555B; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="background-color: #00E5FF; border: 3px solid #000000; padding: 12px; text-align: center; font-weight: 900; text-transform: uppercase; font-size: 10px; margin-bottom: 25px; box-shadow: 3px 3px 0px 0px #000000; color: #000000;">
            Te responderé directamente desde ${contactEmail}
          </div>

          <!-- Footer Accent -->
          <div style="border-top: 2px dashed #000000; padding-top: 15px; text-align: center; font-size: 10px; font-weight: 700; text-transform: uppercase; color: #55555B;">
            © 2026 Jeremerc. Construido bajo la filosofía Neobrutalist + BaseUI.
          </div>

        </div>
      </div>
    `;

    // Send email copy to owner (contacto@jeremerc.dev)
    await sendEmailViaResend({
      from: `JereMerc.dev Portfolio <${senderEmail}>`,
      to: contactEmail,
      reply_to: email,
      subject: `Nueva Consulta de ${name}`,
      html: ownerMailHtml,
    });

    // Send confirmation to the client
    await sendEmailViaResend({
      from: `JereMerc.dev Portfolio <${senderEmail}>`,
      to: email,
      subject: "He recibido tu mensaje - JereMerc.dev",
      html: userMailHtml,
    });

    // Log message submission in Neon DB for audit/stats
    try {
      const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
      await logContactMessage(name, email, message, clientIp);
    } catch (dbErr) {
      console.error("Failed to write to Neon DB audit log:", dbErr);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Resend Mail error:", error);
    return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 });
  }
}
