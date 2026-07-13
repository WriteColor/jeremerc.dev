"use client";

import React, { useState, useEffect } from "react";
import { X, Globe, ArrowUpRight, ShieldCheck, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DomainsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContactWithPrefill?: (msg: string) => void;
}

interface DomainItem {
  name: string;
  status: "Principal" | "En Uso" | "Casi en desuso (Disponible)" | "En desuso (Disponible)";
  category: string;
}

export const DomainsModal: React.FC<DomainsModalProps> = ({ isOpen, onClose, onOpenContactWithPrefill }) => {
  const [searchQuery, setSearchQuery] = useState("");

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


  const domains: DomainItem[] = [
    { name: "jeremerc.dev", status: "Principal", category: "Portfolio & Marca Personal" },
    { name: "gashmc.net", status: "En Uso", category: "Servicios de Videojuegos & Comunidad" },
    { name: "jeremerc.website", status: "En Uso", category: "Espejo del Portfolio & Enlaces" },
    { name: "shakai.store", status: "En Uso", category: "Tienda de Comercio Electrónico" },
    { name: "write-color.cloud", status: "En Uso", category: "Infraestructura & Servidores de Correo" },
    { name: "write-color.com", status: "En Uso", category: "Redirección Principal & Correo" },
    { name: "write-color.es", status: "En Uso", category: "Redirección Regional" },
    { name: "write-color.org", status: "En Uso", category: "Sitio Organizacional" },
    { name: "writecolor.store", status: "En Uso", category: "Reserva de Marca de Tienda" },
    { name: "zalith.net", status: "En Uso", category: "Servicios de Software & APIs" },
    { name: "zalith.store", status: "En Uso", category: "Comercio de Licencias de Software" },
    { name: "4devs.es", status: "Casi en desuso (Disponible)", category: "Dominio para Comunidad de Desarrolladores" },
    { name: "champimc.net", status: "Casi en desuso (Disponible)", category: "Servidor de Juegos de Minecraft" },
    { name: "mydev.es", status: "Casi en desuso (Disponible)", category: "Acortador & Herramientas Web" },
    { name: "tesla-s.net", status: "Casi en desuso (Disponible)", category: "Proyecto de Fan de Autos Eléctricos" },
    { name: "4-devs.online", status: "En desuso (Disponible)", category: "Hosting de Proyectos de Ejemplo" },
    { name: "aeternamc.xyz", status: "En desuso (Disponible)", category: "Servidor de Survival Clásico" },
    { name: "cloudis.online", status: "En desuso (Disponible)", category: "Almacenamiento Web Temporal" },
    { name: "colorsito.me", status: "En desuso (Disponible)", category: "Herramienta de Paletas de Colores" },
    { name: "imdev.online", status: "En desuso (Disponible)", category: "Landing Page de Freelancer" },
    { name: "millie.es", status: "En desuso (Disponible)", category: "Blog Personal o Mascota" },
    { name: "my-api-v1.online", status: "En desuso (Disponible)", category: "Endpoint de APIs de Prueba" },
    { name: "my-minimax.es", status: "En desuso (Disponible)", category: "Proyecto de Algoritmos IA" },
    { name: "puchaina.games", status: "En desuso (Disponible)", category: "Mini-Juegos Web Humorísticos" },
    { name: "udev.es", status: "En desuso (Disponible)", category: "Entorno Académico o Academias" },
    { name: "v-10.es", status: "En desuso (Disponible)", category: "Portafolio de Motores de Renderizado" }
  ];

  const getStatusColor = (status: DomainItem["status"]) => {
    switch (status) {
      case "Principal":
        return "bg-emerald-500 text-black border-emerald-600";
      case "En Uso":
        return "bg-neo-cyan text-black border-sky-600";
      case "Casi en desuso (Disponible)":
        return "bg-neo-yellow text-black border-amber-500";
      case "En desuso (Disponible)":
        return "bg-neo-pink text-black border-pink-600";
      default:
        return "bg-zinc-400 text-black border-zinc-500";
    }
  };

  const filteredDomains = domains.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} 
          className="fixed inset-0 bg-(--c-overlay-bg) backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="neo-card p-5 sm:p-6 md:p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto relative shadow-[10px_10px_0px_0px_rgba(var(--c-shadow),1)] bg-(--c-surface) text-(--c-text) flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b-2 border-(--c-border) pb-4 mb-4 shrink-0">
          <div className="flex items-center gap-2">
            <Globe className="stroke-[2.5] text-neo-cyan" />
            <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-(--c-text)">
              Mis Dominios ({domains.length})
            </h3>
          </div>
          <button 
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("play-click"));
              }
              onClose();
            }}
            aria-label="Cerrar modal"
            className="p-1.5 border-2 border-(--c-border) shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] bg-neo-pink text-black hover:translate-x-px hover:translate-y-px active:translate-x-[2px] active:translate-y-[2px] cursor-pointer"
          >
            <X size={16} className="stroke-3 sm:w-[18px] sm:h-[18px]" />
          </button>
        </div>

        {/* Intro */}
        <p className="font-sans text-xs sm:text-sm font-semibold text-(--c-text-muted) mb-4 shrink-0">
          Aquí se listan todos los nombres de dominios oficiales que poseo actualmente para mis proyectos y redirecciones.
        </p>

        {/* Search Box */}
        <div className="relative mb-4 shrink-0">
          <input
            type="text"
            placeholder="Buscar por dominio, estado o categoría..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border-2 border-(--c-border) bg-(--c-surface-hover) text-(--c-text) font-mono text-xs sm:text-sm font-bold shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] outline-none focus:translate-x-px focus:translate-y-px focus:shadow-[1px_1px_0px_0px_rgba(var(--c-shadow),1)] transition-all"
          />
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-(--c-text-muted)" />
        </div>

        {/* Domains List - Scrollable */}
        <div className="space-y-3 overflow-y-auto max-h-[45vh] pr-1 scrollbar-thin">
          {filteredDomains.length > 0 ? (
            filteredDomains.map((dom, idx) => (
              <div 
                key={idx}
                className="border-3 border-(--c-border) p-3 bg-(--c-surface) hover:bg-(--c-surface-hover) shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition-colors"
              >
                <div className="flex flex-col gap-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display font-black text-xs sm:text-sm uppercase text-(--c-text)">
                      {dom.name}
                    </span>
                    <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 border-2 border-black shadow-[1px_1px_0px_0px_#000] ${getStatusColor(dom.status)}`}>
                      {dom.status}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] text-(--c-text-muted) font-bold">
                    {dom.category}
                  </span>
                </div>

                <div className="flex items-center justify-start sm:justify-end gap-2 shrink-0">
                  {dom.status.includes("Disponible") ? (
                    <button
                      onClick={() => {
                        if (onOpenContactWithPrefill) {
                          onOpenContactWithPrefill(`Hola Jere, estoy interesado en adquirir o utilizar el dominio "${dom.name}" que vi marcado como disponible en tu portafolio.`);
                        }
                      }}
                      className="font-mono font-black text-[9px] sm:text-[10px] uppercase text-neo-pink hover:underline flex items-center gap-0.5 cursor-pointer bg-transparent border-none p-0"
                    >
                      Solicitar Uso <ArrowUpRight size={10} />
                    </button>
                  ) : (
                    <a
                      href={`https://${dom.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono font-black text-[9px] sm:text-[10px] uppercase text-neo-cyan hover:underline flex items-center gap-0.5"
                    >
                      Visitar <ArrowUpRight size={10} />
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center font-mono text-xs text-(--c-text-muted) py-8 border-2 border-dashed border-(--c-border)/20">
              No se encontraron dominios para &quot;{searchQuery}&quot;
            </div>
          )}
        </div>

        {/* SSL & DNS Indicator */}
        <div className="mt-4 border-2 border-dashed border-(--c-border)/30 p-3 bg-(--c-surface-hover) flex items-center gap-2 shrink-0">
          <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
          <span className="font-mono text-[8px] sm:text-[9px] text-(--c-text-muted) font-bold uppercase leading-tight">
            Todos los dominios cuentan con protección DNSSEC y SSL encriptado firmado por Cloudflare.
          </span>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DomainsModal;
