"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

interface ContactFormProps {
  onClose?: () => void;
  initialMessage?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onClose, initialMessage }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(initialMessage || "");

  useEffect(() => {
    if (initialMessage !== undefined) {
      setMessage(initialMessage);
    }
  }, [initialMessage]);

  // Status states: 'idle' | 'loading' | 'success' | 'error'
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const turnstileRef = useRef<HTMLDivElement>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  useEffect(() => {
    let script = document.getElementById("cloudflare-turnstile-script") as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.id = "cloudflare-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (status !== "idle") return;

    let widgetId: string | null = null;

    const renderWidget = () => {
      if (turnstileRef.current && window.turnstile) {
        try {
          turnstileRef.current.innerHTML = "";
          widgetId = window.turnstile.render(turnstileRef.current, {
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

    window.onloadTurnstileCallback = () => {
      renderWidget();
    };

    if (window.turnstile) {
      renderWidget();
    }

    return () => {
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch (e) {
          // Ignore
        }
      }
      delete window.onloadTurnstileCallback;
    };
  }, [status]);

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
    } else if (message.trim().length < 10) {
      tempErrors.message = "Mínimo 10 caracteres.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!turnstileToken) {
      setErrors(prev => ({ ...prev, message: "Por favor complete la verificación de seguridad." }));
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message, token: turnstileToken }),
      });

      if (!response.ok) {
        throw new Error("SMTP dispatch failed");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setTurnstileToken(null);
    } catch (err) {
      setStatus("error");
    }
  };

  /* Shared input class string — uses CSS vars for theme adaptation */
  const inputBase = `px-2 py-1 border-2 border-(--c-border) bg-(--c-input-bg) text-(--c-text) font-sans text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-neo-yellow placeholder:text-(--c-text-subtle)`;

  return (
    <div className="text-(--c-text) w-full">
      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 p-3 border-4 border-black bg-neo-pink text-black font-display font-black text-[10px] uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#000]"
        >
          <AlertCircle size={14} className="stroke-3" />
          Fallo de envío SMTP. Intente más tarde o contácteme directo a contact@jeremerc.site.
        </motion.div>
      )}

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-4 text-center border-4 border-(--c-border) bg-neo-green p-4 shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] text-black"
        >
          <CheckCircle2 size={32} className="stroke-[2.5] mb-1 animate-bounce" />
          <h4 className="font-display font-black text-sm uppercase">¡Mensaje Enviado!</h4>
          <p className="font-sans text-[10px] font-semibold mt-0.5">
            Te responderé lo antes posible.
          </p>
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("play-click"));
              }
              setStatus("idle");
            }}
            className="mt-2 px-4 py-1.5 border-2 border-black font-display font-bold text-xs uppercase bg-white text-black hover:bg-gray-50 active:translate-x-px active:translate-y-px cursor-pointer"
          >
            Enviar otro
          </button>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2 py-0.5"
        >
          {/* Left Column: Name & Email inputs */}
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="flex flex-col gap-2 justify-between"
          >
            {/* Name */}
            <div className="flex flex-col gap-0.5">
              <label className="font-display font-black text-[9px] uppercase text-(--c-text)">Tu Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={status === "loading"}
                className={`${inputBase} ${errors.name ? "border-neo-pink" : ""}`}
                placeholder="Ej. Juan Pérez"
              />
              {errors.name && (
                <span className="font-mono text-[8px] uppercase font-bold text-neo-pink flex items-center gap-0.5 mt-0.5">
                  <AlertCircle size={9} /> {errors.name}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-0.5">
              <label className="font-display font-black text-[9px] uppercase text-(--c-text)">Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                className={`${inputBase} ${errors.email ? "border-neo-pink" : ""}`}
                placeholder="juan@ejemplo.com"
              />
              {errors.email && (
                <span className="font-mono text-[8px] uppercase font-bold text-neo-pink flex items-center gap-0.5 mt-0.5">
                  <AlertCircle size={9} /> {errors.email}
                </span>
              )}
            </div>
          </motion.div>

          {/* Right Column: Message input */}
          <motion.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-0.5 h-full"
          >
            <label className="font-display font-black text-[9px] uppercase text-(--c-text)">Mensaje</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status === "loading"}
              className={`${inputBase} resize-none grow h-21 ${errors.message ? "border-neo-pink" : ""}`}
              placeholder="Cuéntame sobre tu proyecto, objetivos y plazos..."
            />
            {errors.message && (
              <span className="font-mono text-[8px] uppercase font-bold text-neo-pink flex items-center gap-0.5 mt-0.5">
                <AlertCircle size={9} /> {errors.message}
              </span>
            )}
          </motion.div>

          {/* Turnstile Security Verification */}
          <motion.div
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="col-span-1 sm:col-span-2 flex justify-center my-1"
          >
            <div
              ref={turnstileRef}
              className="border-2 border-(--c-border) shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] p-0.5 bg-(--c-surface) inline-block overflow-hidden max-w-full"
            ></div>
          </motion.div>

          {/* Bottom Action buttons row */}
          <motion.div
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="col-span-1 sm:col-span-2 flex gap-2 justify-end mt-1 border-t border-(--c-border)/15 pt-2"
          >
            {onClose && (
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("play-click"));
                  }
                  onClose();
                }}
                disabled={status === "loading"}
                className="px-3.5 py-1.5 border-2 border-(--c-border) font-display font-black text-xs uppercase bg-(--c-surface) text-(--c-text) shadow-[1px_1px_0px_0px_rgba(var(--c-shadow),1)] hover:translate-x-[0.5px] hover:translate-y-[0.5px] active:translate-x-px active:translate-y-px cursor-pointer"
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("play-click"));
                }
              }}
              disabled={status === "loading"}
              className="px-5 py-1.5 border-2 border-(--c-border) bg-neo-yellow text-black font-display font-black text-xs uppercase shadow-[1px_1px_0px_0px_rgba(var(--c-shadow),1)] hover:translate-x-[0.5px] hover:translate-y-[0.5px] active:translate-x-px active:translate-y-px inline-flex items-center gap-1.5 cursor-pointer"
            >
              {status === "loading" ? (
                <>
                  Enviando <Loader2 size={13} className="animate-spin" />
                </>
              ) : (
                <>
                  Enviar <Send size={13} />
                </>
              )}
            </button>
          </motion.div>
        </motion.form>
      )}
    </div>
  );
};

export default ContactForm;
