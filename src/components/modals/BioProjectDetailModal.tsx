"use client";

import React, { useEffect, useRef } from "react";
import { X, Sparkles, BookOpen, Target, Calendar, Award, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Project, getProjectStatusColor } from "@/data/projects";
import { GithubIcon } from "@/components/ui/Icons";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface BioProjectDetailModalProps {
  expandedCard: "quien-soy" | "estudios" | "foco" | Project | null;
  onClose: () => void;
}

export const BioProjectDetailModal: React.FC<BioProjectDetailModalProps> = ({
  expandedCard,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Play click sound if defined globally on window
  const playClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("play-click"));
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && expandedCard) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedCard, onClose]);

  const isOpen = expandedCard !== null;

  useFocusTrap(modalRef, isOpen);

  return (
    <AnimatePresence>
      {isOpen && expandedCard && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-(--c-overlay-bg) backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4"
          onClick={() => {
            playClick();
            onClose();
          }}
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="bioproject-modal-title"
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="neo-card p-5 sm:p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-[10px_10px_0px_0px_rgba(var(--c-shadow),1)] bg-(--c-surface) text-(--c-text) select-none text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Unified Header Row */}
            <div className="flex items-center justify-between border-b-2 border-(--c-border)/10 pb-3.5 mb-4">
              <div id="bioproject-modal-title" className="flex items-center gap-2">
                {expandedCard === "quien-soy" && (
                  <div className="flex items-center gap-1.5 text-neo-pink">
                    <Sparkles className="stroke-[2.5]" size={16} />
                    <span className="font-display font-black text-xs uppercase bg-(--c-text) text-(--c-bg) px-2 py-0.5">
                      Trayectoria
                    </span>
                  </div>
                )}
                {expandedCard === "estudios" && (
                  <div className="flex items-center gap-1.5 text-neo-cyan">
                    <BookOpen className="stroke-[2.5]" size={16} />
                    <span className="font-display font-black text-xs uppercase bg-(--c-text) text-(--c-bg) px-2 py-0.5">
                      Educación
                    </span>
                  </div>
                )}
                {expandedCard === "foco" && (
                  <div className="flex items-center gap-1.5 text-neo-yellow">
                    <Target className="stroke-[2.5]" size={16} />
                    <span className="font-display font-black text-xs uppercase bg-(--c-text) text-(--c-bg) px-2 py-0.5">
                      Especialización
                    </span>
                  </div>
                )}
                {typeof expandedCard === "object" && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 border-2 border-(--c-border) font-display font-black text-[8px] sm:text-[9px] uppercase tracking-wider ${expandedCard.color} text-black shadow-[1px_1px_0px_0px_#000]`}>
                      {expandedCard.type}
                    </span>
                    <span className="px-2 py-0.5 border-2 border-(--c-border) font-mono text-[8px] sm:text-[9px] uppercase font-bold text-(--c-text) bg-(--c-surface-hover)">
                      {expandedCard.category}
                    </span>
                    <span className="font-mono text-[8px] sm:text-[9px] font-black uppercase text-(--c-text-muted)">
                      {expandedCard.metric}
                    </span>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  playClick();
                  onClose();
                }}
                aria-label="Cerrar modal"
                className="p-1.5 border-2 border-(--c-border) shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] bg-neo-pink text-black hover:translate-x-px hover:translate-y-px active:translate-x-[2px] active:translate-y-[2px] cursor-pointer"
              >
                <X size={16} className="stroke-3 sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>

            {/* Modal Body Contents */}
            <div className="select-text">
              {/* Biography sheet */}
              {expandedCard === "quien-soy" && (
                <div className="space-y-4 sm:space-y-5">
                  <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-(--c-text)">
                    Biografía Completa
                  </h3>
                  <div className="space-y-4 font-sans text-xs sm:text-sm text-(--c-text) leading-relaxed font-semibold">
                    <p>
                      Soy un desarrollador de software con una profunda pasión por construir aplicaciones web modernas, robustas, escalables y con un diseño visual interactivo de alta fidelidad. Mi trayectoria comenzó como graduado de Bachillerato Técnico Profesional (BTP) en Informática en 2024, lo que me otorgó una base sólida en mantenimiento de sistemas, soporte y administración de redes locales.
                    </p>
                    <div className="border-l-4 border-neo-pink pl-4 py-1.5 bg-(--c-surface-hover) font-mono text-[10px] sm:text-xs">
                      <span className="text-neo-pink font-black block">FILOSOFÍA DE TRABAJO (ARTESANÍA DEL CÓDIGO):</span>
                      &quot;Me dedico a escribir software mantenible y modular, optimizando cada milisegundo de rendimiento visual en la interfaz y diseñando arquitecturas distribuidas en la periferia (Edge Computing) para que el navegador se sienta vivo, fluido y responda en tiempo real.&quot;
                    </div>
                    <p>
                      Actualmente continúo mi formación como estudiante de Ingeniería en Ciencia de Datos e Inteligencia Artificial. Esto me permite especializarme en la intersección de modelos de lenguaje avanzados, procesamiento de datos masivos y sistemas de audio bidireccionales en tiempo real (STT/TTS/VAD). Combino mi formación académica con un desarrollo autodidacta intensivo en infraestructura de servidores Linux VPS, virtualización con Docker y el despliegue de soluciones tolerantes a fallos en la nube.
                    </p>
                  </div>

                  <div className="border-t-2 border-(--c-border) pt-4 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="font-display font-black text-xs uppercase block text-neo-pink">Objetivos</span>
                      <span className="font-sans text-[10px] sm:text-xs text-(--c-text-muted) font-bold block mt-1">
                        Especializarme en gráficos de alto rendimiento en navegador (WebGL/WebGPU) y aportar a proyectos interactivos a gran escala.
                      </span>
                    </div>
                    <div>
                      <span className="font-display font-black text-xs uppercase block text-neo-cyan">Colaboraciones</span>
                      <span className="font-sans text-[10px] sm:text-xs text-(--c-text-muted) font-bold block mt-1">
                        Abierto a trabajar en equipos dinámicos en remoto, con horarios flexibles y presupuestos que se amolden al tamaño del producto.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Academic Training Sheet */}
              {expandedCard === "estudios" && (
                <div className="space-y-4 sm:space-y-5">
                  <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-(--c-text)">
                    Formación Académica
                  </h3>

                  <div className="space-y-4 font-sans text-xs sm:text-sm text-(--c-text)">
                    <div className="border-3 border-(--c-border) p-3 sm:p-4 bg-(--c-surface-hover) relative shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)]">
                      <div className="absolute top-2 right-2 flex items-center gap-1 text-neo-cyan font-mono text-[9px] font-bold">
                        <Calendar size={10} /> En Curso
                      </div>
                      <span className="font-mono text-xs font-bold text-neo-cyan uppercase">Grado Universitario</span>
                      <h4 className="font-display font-black text-base sm:text-lg uppercase mt-1 text-(--c-text)">
                        Ingeniería en Ciencia de Datos & IA
                      </h4>
                      <p className="font-semibold text-[10px] sm:text-xs mt-1 text-(--c-text-muted)">
                        Estudios enfocados en la construcción de algoritmos de optimización matemática, estructuras de datos complejas, análisis predictivo de datos masivos y el diseño e integración de redes neuronales artificiales y Machine Learning.
                      </p>
                    </div>

                    <div className="border-3 border-(--c-border) p-3 sm:p-4 bg-(--c-surface-hover) relative shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)]">
                      <div className="absolute top-2 right-2 flex items-center gap-1 text-neo-yellow font-mono text-[9px] font-bold">
                        <Award size={10} /> Graduado 2024
                      </div>
                      <span className="font-mono text-xs font-bold text-neo-yellow uppercase">Educación Secundaria Técnica</span>
                      <h4 className="font-display font-black text-base sm:text-lg uppercase mt-1 text-(--c-text)">
                        BTP en Informática
                      </h4>
                      <p className="font-semibold text-[10px] sm:text-xs mt-1 text-(--c-text-muted)">
                        Formación técnica de base sobre mantenimiento de hardware de computadoras, soporte de sistemas operativos, diseño inicial de bases de datos relacionales y cableado estructurado para redes locales LAN.
                      </p>
                    </div>

                    <div className="border-3 border-(--c-border) p-3 sm:p-4 bg-(--c-surface-hover) relative shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)]">
                      <div className="absolute top-2 right-2 flex items-center gap-1 text-neo-pink font-mono text-[9px] font-bold">
                        <Award size={10} /> Autodidacta
                      </div>
                      <span className="font-mono text-xs font-bold text-neo-pink uppercase">Especialización Continua</span>
                      <h4 className="font-display font-black text-base sm:text-lg uppercase mt-1 text-(--c-text)">
                        Desarrollo Full Stack & Cloud
                      </h4>
                      <p className="font-semibold text-[10px] sm:text-xs mt-1 text-(--c-text-muted)">
                        Especialización avanzada e independiente en el despliegue de arquitecturas en la periferia de la red (Edge Computing), optimización SEO de nivel técnico, virtualización y orquestación mediante Docker, y despliegue robusto sobre servidores Linux VPS administrados manualmente.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Professional Focus Sheet */}
              {expandedCard === "foco" && (
                <div className="space-y-4 sm:space-y-5">
                  <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-(--c-text)">
                    Foco Profesional
                  </h3>

                  <div className="space-y-4 font-sans text-xs sm:text-sm text-(--c-text) font-semibold leading-relaxed">
                    <p>
                      Mi enfoque profesional principal consiste en diseñar e implementar arquitecturas sólidas y escalables que unifiquen la lógica de negocio con la excelencia visual interactiva en el navegador. Me apasiona el desarrollo Full Stack moderno, la automatización inteligente mediante Inteligencia Artificial y la optimización extrema del rendimiento para garantizar tiempos de respuesta mínimos.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      <div className="border-2 border-(--c-border) p-3 bg-(--c-surface-hover)">
                        <span className="font-display font-black text-xs uppercase text-neo-pink block">Tecnologías Preferidas</span>
                        <span className="font-sans text-[10px] sm:text-[11px] text-(--c-text-muted) block mt-1 font-bold">
                          React, Next.js, TypeScript, Node.js, Python, Supabase, Cloudflare Workers, Neon DB.
                        </span>
                      </div>
                      <div className="border-2 border-(--c-border) p-3 bg-(--c-surface-hover)">
                        <span className="font-display font-black text-xs uppercase text-neo-cyan block">Ruta de Evolución</span>
                        <span className="font-sans text-[10px] sm:text-[11px] text-(--c-text-muted) block mt-1 font-bold">
                          Integración de streaming de audio interactivo bidireccional en tiempo real, pipelines seguros de IA (Generative AI) y orquestación de bases de datos serverless distribuidas.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Technical Details of a Project */}
              {typeof expandedCard === "object" && (
                <div className="space-y-4 sm:space-y-5 text-left">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight leading-none text-(--c-text)">
                      {expandedCard.title}
                    </h3>
                    <span className={`px-2 py-0.5 border-2 border-black font-display font-black text-[8px] sm:text-[9px] uppercase tracking-wider ${getProjectStatusColor(expandedCard.status)} shadow-[1px_1px_0px_0px_#000] select-none`}>
                      {expandedCard.status}
                    </span>
                  </div>

                  <div className="space-y-4 font-sans text-xs sm:text-sm text-(--c-text)">
                    {/* Problem Section */}
                    <div className="border-4 border-(--c-border) p-3 sm:p-4 bg-(--c-surface-hover)">
                      <span className="font-display font-black text-xs uppercase text-neo-pink block mb-1">
                        El Problema de Negocio
                      </span>
                      <p className="font-semibold text-(--c-text) leading-relaxed text-[10px] sm:text-xs">
                        {expandedCard.problem}
                      </p>
                    </div>

                    {/* Description */}
                    <div>
                      <span className="font-display font-black text-xs uppercase block mb-1 text-(--c-text)">
                        Descripción General
                      </span>
                      <p className="font-medium leading-relaxed text-(--c-text)">
                        {expandedCard.longDesc}
                      </p>
                    </div>

                    {/* Features List */}
                    <div>
                      <span className="font-display font-black text-xs uppercase block mb-2 text-(--c-text)">
                        Funcionalidades Clave
                      </span>
                      <ul className="list-disc pl-5 space-y-1 text-[10px] sm:text-xs font-semibold text-(--c-text)">
                        {expandedCard.features.map((feat, idx) => (
                          <li key={idx}>{feat}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Process timeline */}
                    <div>
                      <span className="font-display font-black text-xs uppercase block mb-2 text-(--c-text)">
                        Proceso de Desarrollo
                      </span>
                      <div className="flex flex-col gap-2 font-mono text-[10px] sm:text-[11px]">
                        {expandedCard.process.map((step, idx) => (
                          <div key={idx} className="flex gap-2 items-start">
                            <span className="text-neo-cyan font-bold">{idx + 1}.</span>
                            <span className="font-sans font-bold text-(--c-text-muted)">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Challenge & Solution */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t-2 border-(--c-border) pt-4 mt-2">
                      <div className="p-3 border-2 border-(--c-border) bg-(--c-surface-hover)">
                        <span className="font-display font-black text-xs uppercase text-neo-pink block">El Reto</span>
                        <p className="font-sans text-[10px] sm:text-[11px] text-(--c-text-muted) font-bold block mt-1 leading-snug">
                          {expandedCard.challenge}
                        </p>
                      </div>
                      <div className="p-3 border-2 border-(--c-border) bg-(--c-surface-hover)">
                        <span className="font-display font-black text-xs uppercase text-neo-green block">La Solución</span>
                        <p className="font-sans text-[10px] sm:text-[11px] text-(--c-text-muted) font-bold block mt-1 leading-snug">
                          {expandedCard.solution}
                        </p>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <span className="font-display font-black text-xs uppercase block mb-2 text-(--c-text)">
                        Tecnologías Utilizadas
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {expandedCard.tags.map((tag, idx) => (
                          <span key={idx} className="px-2.5 py-1 border-2 border-(--c-border) bg-(--c-tag-bg) font-mono text-[10px] sm:text-xs font-bold shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] text-(--c-text)">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Links */}
                  {expandedCard.status !== "Vendido" && (
                    <div className="mt-6 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-2 border-t-2 border-(--c-border)">
                      {expandedCard.githubUrl && (
                        <a
                          href={expandedCard.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 border-3 border-(--c-border) bg-(--c-surface) text-(--c-text) font-display font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] hover:translate-x-px hover:translate-y-px active:translate-x-[2px] active:translate-y-[2px] inline-flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          Repositorio <GithubIcon className="h-4 w-4" />
                        </a>
                      )}
                      {expandedCard.status !== "Discontinuado" && expandedCard.status !== "Deprecado" && expandedCard.liveUrl && (
                        <a
                          href={expandedCard.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 border-3 border-(--c-border) bg-neo-yellow text-black font-display font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] hover:translate-x-px hover:translate-y-px active:translate-x-[2px] active:translate-y-[2px] inline-flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          Demo en Vivo <ExternalLink size={14} className="stroke-[2.5]" />
                        </a>
                      )}
                    </div>
                  )}
                  {expandedCard.status === "Vendido" && (
                    <div className="mt-6 flex justify-end pt-2 border-t-2 border-(--c-border)">
                      <span className="px-4 py-2 border-3 border-black bg-neo-cyan text-black font-display font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] select-none">
                        Código Fuente Vendido (Propiedad Privada)
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default BioProjectDetailModal;
