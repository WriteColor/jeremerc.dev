import { NextResponse } from "next/server";
import net from "net";

const WHOIS_SERVERS: { [key: string]: string } = {
  ".com": "whois.verisign-grs.com",
  ".net": "whois.verisign-grs.com",
  ".org": "whois.pir.org",
  ".es": "whois.nic.es",
  ".com.es": "whois.nic.es",
  ".nom.es": "whois.nic.es",
  ".org.es": "whois.nic.es",
  ".dev": "whois.nic.google",
  ".app": "whois.nic.google",
  ".cloud": "whois.nic.cloud",
  ".tech": "whois.nic.tech",
  ".online": "whois.nic.online",
  ".xyz": "whois.nic.xyz",
  ".shop": "whois.nic.shop",
  ".store": "whois.nic.store",
  ".blog": "whois.nic.blog",
  ".wiki": "whois.nic.wiki",
  ".design": "whois.nic.design",
  ".studio": "whois.nic.studio",
  ".art": "whois.nic.art",
  ".pro": "whois.nic.pro",
  ".info": "whois.nic.info",
  ".biz": "whois.nic.biz",
  ".club": "whois.nic.club",
  ".love": "whois.nic.love",
  ".one": "whois.nic.one",
  ".lat": "whois.nic.lat",
  ".help": "whois.nic.help",
  ".quest": "whois.nic.quest",
  ".homes": "whois.nic.homes",
  ".autos": "whois.nic.autos",
  ".ing": "whois.nic.google",
  ".mom": "whois.nic.mom",
  ".lk": "whois.nic.lk"
};

function getWhoisServer(domain: string): string | null {
  const lower = domain.toLowerCase();
  for (const ext in WHOIS_SERVERS) {
    if (lower.endsWith(ext)) {
      return WHOIS_SERVERS[ext];
    }
  }
  return null;
}

function queryTcpWhois(domain: string, server: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const socket = net.connect(43, server, () => {
      socket.write(domain + "\r\n");
    });

    let buffer = "";
    socket.on("data", (data) => {
      buffer += data.toString();
    });

    socket.on("end", () => {
      resolve(buffer);
    });

    socket.on("error", (err) => {
      reject(err);
    });

    socket.setTimeout(2500, () => {
      socket.destroy();
      reject(new Error("Timeout"));
    });
  });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get("domain");

    if (!domain) {
      return NextResponse.json({ error: "Dominio no provisto" }, { status: 400 });
    }

    // 1. Check if WhoisJSON API Key is provided (Highly accurate, Cloud-safe API check)
    const whoisJsonKey = process.env.WHOISJSON_API_KEY;
    if (whoisJsonKey) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);
        
        const apiRes = await fetch(`https://whoisjson.com/api/v1/whois?domain=${domain}&token=${whoisJsonKey}`, {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (apiRes.ok) {
          const apiData = await apiRes.json();
          // registered boolean indicates if domain is taken
          if (typeof apiData.registered === "boolean") {
            return NextResponse.json({ isAvailable: !apiData.registered, source: "whois-json-api" });
          }
        }
      } catch (apiErr) {
        // Fall back to TCP WHOIS if API fails
      }
    }

    // 2. Direct TCP WHOIS (No key, 100% accurate on localhost/dev and unblocked VPS environments)
    const whoisServer = getWhoisServer(domain);
    if (whoisServer) {
      try {
        const text = await queryTcpWhois(domain, whoisServer);
        const lower = text.toLowerCase();

        // Standard WHOIS available phrases
        const availablePhrases = [
          "not found",
          "no match",
          "no matches",
          "no entries",
          "no data found",
          "free",
          "available",
          "not registered",
          "no se encuentra registrado",
          "objeto no existe"
        ];

        // Authoritative checks for active registrations
        if (lower.includes("registrar:") || lower.includes("registrant:") || lower.includes("creation date:") || lower.includes("titular:")) {
          return NextResponse.json({ isAvailable: false, source: "tcp-whois-occupied" });
        }

        for (const phrase of availablePhrases) {
          if (lower.includes(phrase)) {
            return NextResponse.json({ isAvailable: true, source: "tcp-whois-available" });
          }
        }

        // If response is long, it's highly likely to contain WHOIS registration details
        if (text.length > 200) {
          return NextResponse.json({ isAvailable: false, source: "tcp-whois-len" });
        }
      } catch (tcpErr) {
        // Fall back to Cloudflare DNS DoH if port 43 is blocked (like in Vercel/sandboxes)
      }
    }

    // 3. Fallback to Cloudflare DoH (HTTPS-based, resolves active domains without port 43 or CORS blocks)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const dohRes = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=SOA`, {
        headers: { "Accept": "application/dns-json" },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (dohRes.ok) {
        const dohData = await dohRes.json();
        
        // Status 0 (NOERROR) means the domain resolves to nameservers -> definitely registered
        if (dohData.Status === 0) {
          return NextResponse.json({ isAvailable: false, source: "doh-noerror" });
        }
        
        // Status 3 (NXDOMAIN) -> Domain has no active zone records. 
        if (dohData.Status === 3) {
          // If it is NOT a .es domain, we can query public RDAP as final check
          if (!domain.endsWith(".es")) {
            try {
              const rdapController = new AbortController();
              const rdapTimeout = setTimeout(() => rdapController.abort(), 3000);

              const rdapRes = await fetch(`https://rdap.org/domain/${domain}`, {
                method: "GET",
                signal: rdapController.signal,
                headers: { "Accept": "application/rdap+json, application/json" }
              });
              clearTimeout(rdapTimeout);

              if (rdapRes.status === 200) {
                return NextResponse.json({ isAvailable: false, source: "rdap-occupied" });
              } else if (rdapRes.status === 404) {
                return NextResponse.json({ isAvailable: true, source: "rdap-available" });
              }
            } catch (e) {
              // Ignore and declare available
            }
          }
          return NextResponse.json({ isAvailable: true, source: "doh-nxdomain" });
        }
      }
    } catch (dohErr) {
      // Inconclusive fallback
    }

    return NextResponse.json({ isAvailable: "error" });
  } catch (error: any) {
    console.error("Domain validation API route error:", error);
    return NextResponse.json({ error: error.message || "Failed to validate domain" }, { status: 500 });
  }
}
