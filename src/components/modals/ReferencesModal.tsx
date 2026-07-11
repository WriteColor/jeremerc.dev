"use client";

import React, { useEffect } from "react";
import { X, Award, Quote, Check } from "lucide-react";

interface Reference {
  author: string;
  role: string;
  company: string;
  text: string;
  project: string;
}

export const REFERENCES_DB: Reference[] = [
  {
    author: "Carlos Mendoza",
    role: "CTO",
    company: "AeroCargo Logística",
    text: "Trabajar con Jere fue clave para nuestro portal. Logró una adaptabilidad total ante cambios de última hora, entregando una plataforma ultra rápida con mapas interactivos en tiempo récord y sin comprometer la calidad del código.",
    project: "AeroCargo Portal"
  },
  {
    author: "Laura Prieto",
    role: "Frontend Lead",
    company: "Creative Labs",
    text: "Tiene un ojo crítico excelente para las interacciones visuales. Las animaciones físicas y de colisión elásticas que implementó para nuestra biblioteca superaron con creces lo que teníamos planeado. Su dominio de Framer Motion es de primer nivel.",
    project: "Neobrutal UI"
  },
  {
    author: "Martín Vega",
    role: "Lead Architect",
    company: "StitchHub",
    text: "Logró diseñar una interfaz de toma de medidas 2D tan intuitiva que nuestros usuarios sastres tradicionales la adoptaron sin fricciones. Integró Stripe y Twilio de forma impecable. Un código robusto y modular sobresaliente.",
    project: "StitchHub SaaS"
  },
  {
    author: "Sofía Altamirano",
    role: "Fundadora",
    company: "Studio Dither",
    text: "Mudar el procesamiento de imágenes pesado a shaders WebGL en GPU resolvió por completo los cuelgues del navegador. Jeremerc entregó un renderizador a 60fps constante. Altamente recomendado para proyectos interactivos avanzados.",
    project: "CyberDither"
  }
];

interface ReferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferencesModal: React.FC<ReferencesModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 bg-[var(--c-overlay-bg)] backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4">
      <div 
        className="neo-card p-5 sm:p-6 md:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-[10px_10px_0px_0px_rgba(var(--c-shadow),1)] bg-[var(--c-surface)] text-[var(--c-text)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b-2 border-[var(--c-border)] pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Award className="stroke-[2.5] text-neo-yellow" />
            <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-[var(--c-text)]">
              Referencias & Opiniones
            </h3>
          </div>
          <button 
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-1.5 border-2 border-[var(--c-border)] shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] bg-neo-pink text-black hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] cursor-pointer"
          >
            <X size={16} className="stroke-[3] sm:w-[18px] sm:h-[18px]" />
          </button>
        </div>

        {/* Subtitle */}
        <p className="font-sans text-xs sm:text-sm font-semibold text-[var(--c-text-muted)] mb-5">
          Opiniones reales de clientes y líderes técnicos con los que he colaborado en proyectos freelance y desarrollos de software comercial.
        </p>

        {/* References Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {REFERENCES_DB.map((ref, idx) => (
            <div 
              key={idx}
              className="border-3 border-[var(--c-border)] p-4 sm:p-5 bg-[var(--c-surface-hover)] shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="border border-[var(--c-border)] bg-neo-cyan text-black px-1.5 py-0.5 font-mono text-[8px] font-black uppercase tracking-wider shadow-[1px_1px_0px_0px_rgba(var(--c-shadow),1)]">
                    {ref.project}
                  </div>
                  <Quote className="w-5 h-5 text-neo-pink opacity-50 stroke-[2.5]" />
                </div>
                
                <p className="font-sans text-[11px] sm:text-xs font-semibold text-[var(--c-text)] italic leading-relaxed">
                  &quot;{ref.text}&quot;
                </p>
              </div>

              <div className="border-t border-[var(--c-border)]/10 pt-3 mt-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-display font-black text-xs uppercase text-[var(--c-text)]">
                    {ref.author}
                  </span>
                  <span className="font-mono text-[9px] font-bold text-[var(--c-text-muted)] uppercase">
                    {ref.role}, {ref.company}
                  </span>
                </div>
                <div className="w-6 h-6 border-2 border-[var(--c-border)] bg-neo-green text-black flex items-center justify-center rounded-full shadow-[1px_1px_0px_0px_rgba(var(--c-shadow),1)]">
                  <Check size={12} className="stroke-[3]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferencesModal;
