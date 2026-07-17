import React, { useState, useEffect, useRef } from "react";
import { X, Globe, Calendar, Server, Shield, CircleDollarSign, BarChart3, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DomainWhoisInfo, DomainValuationInfo } from "./DomainData";
import { DomainCacheService } from "./DomainCacheService";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface DomainDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  domainName: string;
}

interface DomainDetailsData {
  domain: string;
  whois: DomainWhoisInfo;
  valuation: DomainValuationInfo;
}

export const DomainDetailsModal: React.FC<DomainDetailsModalProps> = ({ isOpen, onClose, domainName }) => {
  const [activeTab, setActiveTab] = useState<"whois" | "valuation">("whois");
  const modalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DomainDetailsData | null>(null);
  const [cacheWarning, setCacheWarning] = useState<string | null>(null);

  // Play click sound if defined globally on window
  const playClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("play-click"));
    }
  };

  useFocusTrap(modalRef, isOpen);

  useEffect(() => {
    if (!isOpen || !domainName) return;

    setActiveTab("whois");

    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      setData(null);
      setCacheWarning(null);

      // 1. Try non-expired cache first
      const cached = DomainCacheService.getDomainInfo(domainName);
      if (cached) {
        setData(cached.data);
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/domains/info?domain=${encodeURIComponent(domainName)}`);
        if (!res.ok) {
          throw new Error("No se pudieron cargar los detalles del dominio.");
        }
        const json = await res.json();
        
        // 2. Cache successful result
        DomainCacheService.saveDomainInfo(domainName, json);
        setData(json);
      } catch (err: any) {
        // 3. Fallback to expired cache on network error
        const expiredCached = DomainCacheService.getDomainInfo(domainName, true);
        if (expiredCached) {
          setData(expiredCached.data);
          setCacheWarning("Mostrando ficha técnica local (Expirada) debido a un fallo de red.");
        } else {
          setError(err.message || "Error al conectar con el servidor.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [isOpen, domainName]);

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return "No disponible";
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              playClick();
              onClose();
            }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="domain-details-modal-title"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-(--c-surface) text-(--c-text) border-4 border-black p-5 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-10 select-none overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="absolute top-4 right-4 border-2 border-black bg-neo-pink text-black p-1 hover:translate-x-[0.5px] hover:translate-y-[0.5px] active:translate-x-[1px] active:translate-y-[1px] transition-transform shadow-[2px_2px_0px_0px_#000] cursor-pointer"
            >
              <X size={18} className="stroke-[3]" />
            </button>

            {/* Header */}
            <div className="border-b-4 border-black pb-4 mb-4 text-left">
              <span className="font-display font-black text-[10px] uppercase bg-neo-cyan text-black px-2 py-1 shadow-[2px_2px_0px_0px_#000] border-2 border-black mr-2 inline-block">
                Inspección de Dominio
              </span>
              <h3 id="domain-details-modal-title" className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-(--c-text) mt-2 leading-none">
                {domainName}
              </h3>
            </div>

            {/* Error or Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <Loader2 className="animate-spin text-neo-yellow stroke-[3]" size={36} />
                <span className="font-mono text-xs uppercase font-bold text-(--c-text-muted)">
                  Consultando registros distribuidos WHOIS y valoración...
                </span>
              </div>
            )}

            {error && (
              <div className="border-3 border-black bg-neo-pink/20 text-(--c-text) p-4 shadow-[3px_3px_0px_0px_#000] my-6 flex items-start gap-3 text-left">
                <AlertCircle className="text-neo-pink shrink-0" size={20} />
                <div>
                  <h4 className="font-display font-black text-xs uppercase">Error de Inspección</h4>
                  <p className="font-sans text-xs font-semibold mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Cache Warning indicator */}
            {!isLoading && cacheWarning && (
              <div className="border-3 border-black bg-neo-yellow/20 text-(--c-text) p-3 shadow-[2px_2px_0px_0px_#000] mb-4 flex items-start gap-2.5 text-left">
                <AlertCircle className="text-neo-yellow shrink-0" size={16} />
                <div className="font-sans text-xs font-bold leading-tight">
                  {cacheWarning}
                </div>
              </div>
            )}

            {/* Loaded content */}
            {!isLoading && !error && data && (
              <div className="space-y-5">
                {/* Tabs Selector */}
                <div className="flex border-3 border-black bg-black p-0.5 gap-0.5">
                  <button
                    onClick={() => {
                      playClick();
                      setActiveTab("whois");
                    }}
                    className={`flex-1 py-2 font-display font-black text-xs uppercase text-center cursor-pointer transition-colors ${
                      activeTab === "whois"
                        ? "bg-neo-yellow text-black"
                        : "bg-(--c-surface) text-(--c-text) hover:bg-(--c-surface-hover)"
                    }`}
                  >
                    Detalles WHOIS
                  </button>
                  <button
                    onClick={() => {
                      playClick();
                      setActiveTab("valuation");
                    }}
                    className={`flex-1 py-2 font-display font-black text-xs uppercase text-center cursor-pointer transition-colors ${
                      activeTab === "valuation"
                        ? "bg-neo-yellow text-black"
                        : "bg-(--c-surface) text-(--c-text) hover:bg-(--c-surface-hover)"
                    }`}
                  >
                    Valoración Estimada
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="min-h-[250px] text-left select-text">
                  <AnimatePresence mode="wait">
                    {activeTab === "whois" && (
                      <motion.div
                        key="whois"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="space-y-4"
                      >
                        {/* WHOIS TABLE */}
                        <div className="border-3 border-black bg-(--c-surface) shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden font-mono text-xs">
                          <div className="grid grid-cols-3 border-b-2 border-black bg-black/5 p-2.5 font-bold uppercase">
                            <div>Propiedad</div>
                            <div className="col-span-2">Información</div>
                          </div>
                          
                          <div className="divide-y-2 divide-black/10">
                            <div className="grid grid-cols-3 p-2.5 items-start">
                              <div className="font-bold flex items-center gap-1.5"><Globe size={13} /> Registrador</div>
                              <div className="col-span-2 font-semibold text-(--c-text)">{data.whois.registrar || "Desconocido"}</div>
                            </div>
                            
                            <div className="grid grid-cols-3 p-2.5 items-start">
                              <div className="font-bold flex items-center gap-1.5"><Calendar size={13} /> Creación</div>
                              <div className="col-span-2 font-semibold text-(--c-text)">{formatDate(data.whois.creation_date)}</div>
                            </div>

                            <div className="grid grid-cols-3 p-2.5 items-start">
                              <div className="font-bold flex items-center gap-1.5"><Calendar size={13} /> Expiración</div>
                              <div className="col-span-2 font-semibold text-(--c-text)">{formatDate(data.whois.expiration_date)}</div>
                            </div>

                            <div className="grid grid-cols-3 p-2.5 items-start">
                              <div className="font-bold flex items-center gap-1.5"><Calendar size={13} /> Modificado</div>
                              <div className="col-span-2 font-semibold text-(--c-text)">{formatDate(data.whois.updated_date)}</div>
                            </div>

                            <div className="grid grid-cols-3 p-2.5 items-start">
                              <div className="font-bold flex items-center gap-1.5"><Server size={13} /> DNS Servers</div>
                              <div className="col-span-2 space-y-0.5">
                                {data.whois.name_servers && data.whois.name_servers.length > 0 ? (
                                  data.whois.name_servers.map((ns, idx) => (
                                    <div key={idx} className="font-semibold">{ns}</div>
                                  ))
                                ) : (
                                  <div className="font-semibold italic text-(--c-text-muted)">No detectados</div>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-3 p-2.5 items-start">
                              <div className="font-bold flex items-center gap-1.5"><Shield size={13} /> WHOIS Server</div>
                              <div className="col-span-2 font-semibold text-(--c-text-muted) break-all">{data.whois.whois_server || "No listado"}</div>
                            </div>
                          </div>
                        </div>

                        <p className="font-sans text-[10px] font-bold text-(--c-text-muted) italic pl-1 leading-relaxed">
                          * Los datos WHOIS se obtienen a través de servidores oficiales del registro y pueden tardar unos segundos en reflejar cambios recientes de propietario.
                        </p>
                      </motion.div>
                    )}

                    {activeTab === "valuation" && (
                      <motion.div
                        key="valuation"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="space-y-4"
                      >
                        {/* Estimate Card */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="border-3 border-black p-3.5 bg-black/5 text-center">
                            <span className="font-mono text-[9px] uppercase font-bold text-(--c-text-muted) block">Valor Mínimo</span>
                            <span className="font-display font-black text-lg sm:text-xl text-(--c-text) mt-1 block">
                              {formatCurrency(data.valuation.estimate.low, data.valuation.estimate.currency)}
                            </span>
                          </div>
                          
                          <div className="border-3 border-black p-3.5 bg-neo-cyan/15 text-center shadow-[2px_2px_0px_0px_#000]">
                            <span className="font-mono text-[9px] uppercase font-bold text-(--c-text-muted) block">Valor Medio</span>
                            <span className="font-display font-black text-xl sm:text-2xl text-neo-cyan dark:text-cyan-400 mt-1 block">
                              {formatCurrency(data.valuation.estimate.mid, data.valuation.estimate.currency)}
                            </span>
                          </div>

                          <div className="border-3 border-black p-3.5 bg-black/5 text-center">
                            <span className="font-mono text-[9px] uppercase font-bold text-(--c-text-muted) block">Valor Máximo</span>
                            <span className="font-display font-black text-lg sm:text-xl text-(--c-text) mt-1 block">
                              {formatCurrency(data.valuation.estimate.high, data.valuation.estimate.currency)}
                            </span>
                          </div>
                        </div>

                        {/* Confidence score */}
                        <div className="border-3 border-black p-4 bg-(--c-surface) space-y-2">
                          <div className="flex justify-between items-center font-mono text-[10px] font-bold">
                            <span className="uppercase text-(--c-text-muted)">Nivel de Confianza del Algoritmo</span>
                            <span className="text-(--c-text)">{Math.round(data.valuation.confidence * 100)}%</span>
                          </div>
                          <div className="border-2 border-black h-4 bg-black/10 overflow-hidden p-0.5">
                            <div 
                              className="h-full bg-neo-yellow border-r-2 border-black" 
                              style={{ width: `${data.valuation.confidence * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Valuation Factors */}
                        <div className="border-3 border-black p-4 bg-(--c-surface-hover) space-y-3">
                          <h4 className="font-display font-black text-xs uppercase flex items-center gap-1.5">
                            <BarChart3 size={14} /> Factores de Valoración Clave
                          </h4>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                            <div className="flex justify-between items-center border-b border-black/10 pb-1">
                              <span className="text-(--c-text-muted)">Longitud:</span>
                              <span className="font-bold text-(--c-text)">{data.valuation.factors.length} letras</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-black/10 pb-1">
                              <span className="text-(--c-text-muted)">Extensión (TLD):</span>
                              <span className="font-bold text-neo-pink uppercase">{data.valuation.tld}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-black/10 pb-1">
                              <span className="text-(--c-text-muted)">Solo letras:</span>
                              <span className={`font-bold ${data.valuation.factors.lettersOnly ? "text-neo-green" : "text-neo-pink"}`}>
                                {data.valuation.factors.lettersOnly ? "Sí" : "No"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center border-b border-black/10 pb-1">
                              <span className="text-(--c-text-muted)">Palabra en diccionario:</span>
                              <span className={`font-bold ${data.valuation.factors.isDictionaryWord ? "text-neo-green" : "text-(--c-text-muted)"}`}>
                                {data.valuation.factors.isDictionaryWord ? "Sí" : "No"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center border-b border-black/10 pb-1 sm:col-span-2">
                              <span className="text-(--c-text-muted)">Marca potencial (Brandable):</span>
                              <span className={`font-bold ${data.valuation.factors.isBrandable ? "text-neo-green" : "text-(--c-text-muted)"}`}>
                                {data.valuation.factors.isBrandable ? "Sí" : "No"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {data.valuation.methodology && (
                          <div className="font-sans text-[10px] font-bold text-(--c-text-muted) pl-1">
                            <strong>Metodología:</strong> {data.valuation.methodology}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer Action */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      playClick();
                      onClose();
                    }}
                    className="border-3 border-black bg-black text-white font-display font-black text-xs uppercase px-4 py-2 hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    Entendido
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default DomainDetailsModal;
