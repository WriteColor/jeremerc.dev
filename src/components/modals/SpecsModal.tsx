"use client";

import React, { useState, useEffect } from "react";
import { X, Cpu, HardDrive, Laptop, Monitor, ArrowUpRight, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SpecItem {
  title: string;
  shortInfo: string;
  details: { label: string; value: string }[];
  icon: React.ReactNode;
  officialLink?: string;
  docsInfo?: string;
}

export const SpecsModal: React.FC<SpecsModalProps> = ({ isOpen, onClose }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Close on Escape key
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

  const specSections: SpecItem[] = [
    {
      title: "Equipo & Sistema",
      shortInfo: "Acer Predator Helios Neo 16s AI (PHN16S-71)",
      icon: <Laptop className="w-5 h-5 text-neo-pink" />,
      officialLink: "https://www.acer.com/us-en/predator/laptops/helios/helios-neo-16s-ai/pdp/NH.U0KAA.001#pdpSpecs",
      details: [
        { label: "Fabricante", value: "Acer" },
        { label: "Modelo", value: "Predator PHN16S-71 (Helios Neo 16s AI)" },
        { label: "Sistema Operativo", value: "Windows 11 IoT Enterprise LTSC (Build 26100)" },
        { label: "Enfoque de Sistema", value: "Estación de desarrollo móvil con IA integrada" },
        { label: "Diseño Térmico", value: "Ventiladores duales AeroBlade 3D de 5.ª Gen + Metal Líquido" }
      ],
      docsInfo: "Diseñado para albergar componentes de alto TGP/TDP con refrigeración optimizada de metal líquido."
    },
    {
      title: "Procesador (CPU)",
      shortInfo: "Intel Core Ultra 9 275HX (Arrow Lake-HX)",
      icon: <Cpu className="w-5 h-5 text-neo-cyan" />,
      officialLink: "https://www.intel.la/content/www/xl/es/products/sku/242293/intel-core-ultra-9-processor-275hx-36m-cache-up-to-5-40-ghz/specifications.html",
      details: [
        { label: "Arquitectura", value: "Arrow Lake-HX (TSMC 3nm N3B)" },
        { label: "Núcleos Totales", value: "24 Núcleos físicos" },
        { label: "P-Cores (Performance)", value: "8 Cores (Frecuencia Máx Turbo: 5.40 GHz)" },
        { label: "E-Cores (Efficient)", value: "16 Cores (Frecuencia Máx Turbo: 4.60 GHz)" },
        { label: "Hilos de Ejecución", value: "24 Hilos (Sin Hyperthreading)" },
        { label: "Caché L2", value: "40 MB" },
        { label: "Caché L3 (Smart Cache)", value: "36 MB" },
        { label: "Potencia Eléctrica", value: "55W Base / 160W Turbo Máx" },
        { label: "NPU Integrada", value: "Intel AI Boost (13 TOPS)" }
      ],
      docsInfo: "Arrow Lake-HX representa la primera generación Enthusiast de Intel que elimina el Hyperthreading, logrando un rendimiento multinúcleo más eficiente térmicamente."
    },
    {
      title: "Tarjeta Gráfica (GPU)",
      shortInfo: "NVIDIA RTX 5070 Ti Laptop + Intel Arc",
      icon: <Monitor className="w-5 h-5 text-neo-yellow" />,
      officialLink: "https://www.notebookcheck.net/Nvidia-GeForce-RTX-5070-Ti-Laptop-Benchmarks-and-Specs.934945.0.html",
      details: [
        { label: "GPU Dedicada", value: "NVIDIA GeForce RTX 5070 Ti Laptop GPU (Blackwell)" },
        { label: "Memoria VRAM", value: "12 GB GDDR7" },
        { label: "Interfaz de Memoria", value: "192-bit" },
        { label: "Núcleos CUDA", value: "5,888" },
        { label: "Arquitectura GPU", value: "Blackwell (GB205 chip)" },
        { label: "Características clave", value: "DLSS 4/4.5 (Multi-Frame Generation), trazado de rayos avanzado" },
        { label: "GPU Integrada", value: "Intel Arc Graphics" },
        { label: "Mejora vs RTX 5070", value: "~23% de rendimiento adicional promedio" }
      ],
      docsInfo: "La arquitectura Blackwell móvil introduce memorias GDDR7 de alta velocidad y capacidades de cómputo Tensor para cálculos avanzados de IA."
    },
    {
      title: "Memoria & Almacenamiento",
      shortInfo: "32 GB DDR5-6400 + 1 TB NVMe SSD",
      icon: <HardDrive className="w-5 h-5 text-neo-green" />,
      details: [
        { label: "Memoria RAM", value: "32 GB DDR5" },
        { label: "Frecuencia de RAM", value: "6400 MHz (Alta velocidad)" },
        { label: "Modo de canal", value: "Dual Channel" },
        { label: "Almacenamiento SSD", value: "1 TB Samsung NVMe SSD" },
        { label: "Ranuras de Expansión", value: "2x M.2 PCIe Gen 4" }
      ],
      docsInfo: "Cargado con RAM DDR5-6400 para permitir la carga y ejecución fluida de modelos de lenguaje locales (LLMs) y compilación intensiva."
    },
    {
      title: "Pantalla OLED",
      shortInfo: "16\" 2.5K (2560 × 1600) @ 240Hz",
      icon: <Laptop className="w-5 h-5 text-neo-cyan" />,
      details: [
        { label: "Tamaño", value: "16 pulgadas (Relación de aspecto 16:10)" },
        { label: "Resolución", value: "2560 x 1600 (WQXGA)" },
        { label: "Frecuencia de Refresco", value: "240 Hz" },
        { label: "Tipo de Panel", value: "OLED" },
        { label: "Gama cromática", value: "100% DCI-P3 (Precisión de color absoluta)" },
        { label: "Brillo SDR", value: "400 nits típico" },
        { label: "Brillo HDR Máximo", value: "500 nits (Certificación VESA DisplayHDR True Black 500)" }
      ],
      docsInfo: "El panel OLED de 240Hz ofrece negros puros con contraste infinito, ideal para desarrollo frontend y diseño de precisión visual."
    }
  ];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="fixed inset-0 bg-[var(--c-overlay-bg)] backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4">
      <div 
        className="neo-card p-5 sm:p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-[10px_10px_0px_0px_rgba(var(--c-shadow),1)] bg-[var(--c-surface)] text-[var(--c-text)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar to avoid close button overlap */}
        <div className="flex items-center justify-between border-b-2 border-[var(--c-border)] pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Laptop className="stroke-[2.5] text-neo-yellow" />
            <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-[var(--c-text)]">
              Especificaciones del Equipo
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

        {/* Intro */}
        <p className="font-sans text-xs sm:text-sm font-semibold text-[var(--c-text-muted)] mb-5">
          Este es el hardware principal utilizado para compilar este portafolio, diseñar interfaces y desarrollar aplicaciones 3D y SaaS en local.
        </p>

        {/* Accordions */}
        <div className="space-y-3">
          {specSections.map((sec, idx) => {
            const isExpanded = expandedSection === sec.title;
            return (
              <div 
                key={idx}
                className="border-3 border-[var(--c-border)] bg-[var(--c-surface-hover)] shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)]"
              >
                {/* Section Header Button */}
                <button
                  onClick={() => toggleSection(sec.title)}
                  className="w-full text-left p-3 sm:p-4 flex items-center justify-between font-display font-black text-sm uppercase tracking-wider text-[var(--c-text)] cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {sec.icon}
                    <div className="flex flex-col">
                      <span>{sec.title}</span>
                      <span className="font-mono text-[9px] sm:text-[10px] text-[var(--c-text-muted)] tracking-normal font-bold">
                        {sec.shortInfo}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-lg font-black text-neo-pink">
                    {isExpanded ? "−" : "+"}
                  </span>
                </button>

                {/* Section Body */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden border-t-2 border-[var(--c-border)]/20"
                    >
                      <div className="p-3 sm:p-4 space-y-3 font-sans text-xs">
                        
                        {/* Table */}
                        <div className="grid grid-cols-1 gap-1 border-b border-[var(--c-border)]/10 pb-3">
                          {sec.details.map((det, dIdx) => (
                            <div key={dIdx} className="flex flex-col sm:flex-row justify-between sm:items-center py-1 border-b border-dashed border-[var(--c-border)]/5">
                              <span className="font-mono font-bold text-[var(--c-text-muted)] text-[10px] sm:text-xs">
                                {det.label}
                              </span>
                              <span className="font-semibold text-[var(--c-text)] text-[10px] sm:text-xs sm:text-right">
                                {det.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Extra notes */}
                        {sec.docsInfo && (
                          <div className="border-l-4 border-neo-yellow pl-3 py-1 bg-[var(--c-surface)] font-medium text-[10px] sm:text-xs text-[var(--c-text-muted)] italic">
                            <span className="font-display font-black uppercase text-neo-yellow text-[9px] block not-italic">Información Técnica</span>
                            &quot;{sec.docsInfo}&quot;
                          </div>
                        )}

                        {/* Links */}
                        {sec.officialLink && (
                          <div className="flex justify-end pt-1">
                            <a
                              href={sec.officialLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono font-black text-[9px] sm:text-[10px] uppercase text-neo-cyan hover:underline flex items-center gap-0.5"
                            >
                              Ver en fabricante <ArrowUpRight size={10} />
                            </a>
                          </div>
                        )}

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpecsModal;
