import React, { useState, useEffect, useRef } from "react";
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface DomainSolicitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDomains: { fqdn: string; price: number }[];
}

export const DomainSolicitationModal: React.FC<DomainSolicitationModalProps> = ({
  isOpen,
  onClose,
  selectedDomains,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [discord, setDiscord] = useState("");
  const [message, setMessage] = useState("");
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const turnstileRef = useRef<HTMLDivElement>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  // Set initial pre-filled message with multiple domains
  useEffect(() => {
    if (isOpen) {
      setName("");
      setEmail("");
      setDiscord("");
      
      const totalPrice = selectedDomains.reduce((sum, d) => sum + d.price, 0);
      const domainListText = selectedDomains
        .map(d => `- ${d.fqdn} ($${d.price} USD/1er año)`)
        .join("\n");
        
      setMessage(
        `Hola, me gustaría solicitar la disponibilidad del registro de los siguientes dominios:\n${domainListText}\n\nPrecio total estimado: $${totalPrice} USD el primer año.`
      );
      setStatus("idle");
      setTurnstileToken(null);
      setErrors({});
    }
  }, [isOpen, selectedDomains]);

  useFocusTrap(modalRef, isOpen);

  // Load Cloudflare Turnstile Script
  useEffect(() => {
    if (!isOpen) return;
    
    let script = document.getElementById("cloudflare-turnstile-script") as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.id = "cloudflare-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, [isOpen]);

  // Render Turnstile Widget
  useEffect(() => {
    if (!isOpen || status !== "idle") return;

    let widgetId: string | null = null;

    const renderWidget = () => {
      if (turnstileRef.current && (window as any).turnstile) {
        try {
          turnstileRef.current.innerHTML = "";
          widgetId = (window as any).turnstile.render(turnstileRef.current, {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
            callback: (token: string) => {
              setTurnstileToken(token);
            },
            "expired-callback": () => {
              setTurnstileToken(null);
            },
            "error-callback": () => {
              setTurnstileToken(null);
            }
          });
        } catch (e) {
          console.error("Turnstile render error:", e);
        }
      }
    };

    (window as any).onloadTurnstileCallback = () => {
      renderWidget();
    };

    if ((window as any).turnstile) {
      renderWidget();
    }

    return () => {
      if (widgetId && (window as any).turnstile) {
        try {
          (window as any).turnstile.remove(widgetId);
        } catch (e) {
          // Ignore
        }
      }
      delete (window as any).onloadTurnstileCallback;
    };
  }, [isOpen, status]);

  const validate = () => {
    const tempErrors: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) tempErrors.name = "Obligatorio.";
    
    if (!email.trim()) {
      tempErrors.email = "Obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email inválido.";
    }

    if (!message.trim()) {
      tempErrors.message = "Obligatorio.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!turnstileToken) {
      setErrors(prev => ({ ...prev, message: "Completa la verificación anti-bot." }));
      return;
    }

    setStatus("loading");

    const fullMessage = `${message}\n\nContacto de Discord: ${discord ? discord : "No provisto"}`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: fullMessage,
          token: turnstileToken,
        }),
      });

      if (!res.ok) {
        throw new Error("HTTP error " + res.status);
      }

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const inputBase = "w-full border-3 border-black p-2 font-mono text-xs focus:outline-none focus:bg-(--c-surface-hover) bg-(--c-surface) text-(--c-text) shadow-[inset_2px_2px_0px_0px_rgba(0,0,0,0.15)]";

  const domainNamesText = selectedDomains.map(d => d.fqdn).join(", ");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4">
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="solicitation-modal-title"
            initial={{ scale: 0.95, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 15, opacity: 0 }}
            className="border-4 border-black bg-(--c-bg) shadow-[8px_8px_0px_0px_#000000] p-5 w-full max-w-lg relative text-left"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b-3 border-black pb-3 mb-4">
              <span id="solicitation-modal-title" className="font-display font-black text-xs uppercase bg-neo-pink text-black px-2 py-1 shadow-[2px_2px_0px_0px_#000]">
                Solicitud de Dominio(s)
              </span>
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("play-click"));
                  }
                  onClose();
                }}
                className="p-1 border-2 border-black bg-neo-pink text-black hover:translate-x-[0.5px] hover:translate-y-[0.5px] active:translate-x-px active:translate-y-px cursor-pointer"
              >
                <X size={14} className="stroke-3" />
              </button>
            </div>

            {status === "success" ? (
              <div className="text-center py-6 space-y-4">
                <div className="inline-block border-4 border-black bg-neo-green p-3 shadow-[3px_3px_0px_0px_#000]">
                  <CheckCircle2 size={32} className="stroke-3 text-black animate-bounce" />
                </div>
                <h3 className="font-display font-black text-sm uppercase">¡Solicitud Enviada!</h3>
                <p className="font-sans text-xs text-(--c-text-muted) leading-relaxed">
                  He recibido los detalles de tus dominios: <strong className="font-mono text-xs">{domainNamesText}</strong>. Te escribiré a la brevedad por Discord o correo para coordinar los métodos de pago y la entrega.
                </p>
                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("play-click"));
                    }
                    onClose();
                  }}
                  className="px-4 py-2 border-3 border-black font-display font-black text-xs uppercase bg-white text-black shadow-[3px_3px_0px_0px_#000] hover:translate-y-0.5 active:translate-y-1 transition-transform cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                {status === "error" && (
                  <div className="border-3 border-black bg-neo-pink text-black p-3 font-mono text-[11px] font-bold flex items-center gap-2 mb-2">
                    <AlertCircle size={16} className="shrink-0" />
                    Hubo un problema de red. Intenta enviar de nuevo o contáctame directo.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-display font-black text-[10px] uppercase text-(--c-text) block mb-1">Nombre</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={status === "loading"}
                      className={`${inputBase} ${errors.name ? "border-neo-pink" : ""}`}
                      placeholder="Tu nombre"
                    />
                    {errors.name && (
                      <span className="font-mono text-[9px] text-neo-pink block mt-0.5">{errors.name}</span>
                    )}
                  </div>
                  <div>
                    <label className="font-display font-black text-[10px] uppercase text-(--c-text) block mb-1">Correo</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "loading"}
                      className={`${inputBase} ${errors.email ? "border-neo-pink" : ""}`}
                      placeholder="tu@correo.com"
                    />
                    {errors.email && (
                      <span className="font-mono text-[9px] text-neo-pink block mt-0.5">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="font-display font-black text-[10px] uppercase text-(--c-text) block mb-1">
                    Usuario de Discord <span className="text-[9px] text-(--c-text-muted)">(Recomendado)</span>
                  </label>
                  <input
                    type="text"
                    value={discord}
                    onChange={(e) => setDiscord(e.target.value)}
                    disabled={status === "loading"}
                    className={inputBase}
                    placeholder="ID o nombre_usuario"
                  />
                </div>

                <div>
                  <label className="font-display font-black text-[10px] uppercase text-(--c-text) block mb-1">Mensaje de Solicitud</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={status === "loading"}
                    className={`${inputBase} h-28 resize-none`}
                  />
                </div>

                {/* Turnstile verification box */}
                <div className="flex justify-center py-1">
                  <div ref={turnstileRef} className="border-2 border-black p-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] inline-block overflow-hidden"></div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 justify-end pt-2 border-t-2 border-black/10">
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(new CustomEvent("play-click"));
                      }
                      onClose();
                    }}
                    disabled={status === "loading"}
                    className="px-3.5 py-1.5 border-2 border-black bg-(--c-surface) text-(--c-text) font-display font-black text-xs uppercase shadow-[2px_2px_0px_0px_#000] hover:translate-x-[0.5px] hover:translate-y-[0.5px] active:translate-x-px active:translate-y-px cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-5 py-1.5 border-2 border-black bg-neo-yellow text-black font-display font-black text-xs uppercase shadow-[2px_2px_0px_0px_#000] hover:translate-x-[0.5px] hover:translate-y-[0.5px] active:translate-x-px active:translate-y-px inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    {status === "loading" ? (
                      <>
                        Enviando <Loader2 size={13} className="animate-spin" />
                      </>
                    ) : (
                      <>
                        Solicitar <Send size={13} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
