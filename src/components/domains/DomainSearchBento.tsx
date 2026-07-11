import React, { useState, useEffect } from "react";
import { Globe, ArrowRight, Laptop, Sparkles, ChevronRight, X, AlertTriangle, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { parseAndValidateDomain, ParsedDomain } from "./DomainValidator";
import { DOMAIN_EXTENSIONS, DomainExtensionInfo } from "./DomainData";
import { DomainResultsTable, DomainResult } from "./DomainResultsTable";
import { DomainSearchTerminal } from "./DomainSearchTerminal";
import { DomainSolicitationModal } from "./DomainSolicitationModal";

export const DomainSearchBento: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [rawQuery, setRawQuery] = useState("");
  const [validation, setValidation] = useState<ParsedDomain | null>(null);
  
  const [isSearching, setIsSearching] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [searchCompleted, setSearchCompleted] = useState(false);

  const [results, setResults] = useState<DomainResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<DomainResult | null>(null);
  const [isSolicitationOpen, setIsSolicitationOpen] = useState(false);

  // Validate on query change
  useEffect(() => {
    if (!rawQuery) {
      setValidation(null);
      return;
    }
    const res = parseAndValidateDomain(rawQuery);
    setValidation(res);
  }, [rawQuery]);

  // Clean raw query on blur if valid
  const handleBlur = () => {
    if (validation?.isValid) {
      setRawQuery(validation.cleanInput);
    }
  };

  // Perform DNS check via Cloudflare DNS JSON API (DoH)
  const checkDomainDns = async (base: string, ext: string): Promise<boolean | "error"> => {
    try {
      const fqdn = `${base}${ext}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 seconds timeout

      const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${fqdn}&type=SOA`, {
        headers: { accept: "application/dns-json" },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) return "error";

      const data = await res.json();
      // Status 3 is NXDOMAIN (Domain does not exist / Available)
      // Status 0 is NOERROR (Domain exists / Occupied)
      if (data.Status === 3) {
        return true; // Available
      } else if (data.Status === 0) {
        return false; // Registered / Occupied
      }
      return "error";
    } catch (err) {
      console.warn(`DNS check failed for ${base}${ext}:`, err);
      return "error";
    }
  };

  // Process DNS queries in small batches to respect rate limits and browser sockets
  const runParallelQueries = async (baseName: string) => {
    const list: DomainResult[] = [];
    const batchSize = 6;
    const extensionsToQuery = [...DOMAIN_EXTENSIONS];

    for (let i = 0; i < extensionsToQuery.length; i += batchSize) {
      const batch = extensionsToQuery.slice(i, i + batchSize);
      const promises = batch.map(async (extInfo) => {
        const isAvailable = await checkDomainDns(baseName, extInfo.extension);
        return {
          extension: extInfo.extension,
          isAvailable,
          firstYearPrice: extInfo.firstYearPrice,
          renewalPrice: extInfo.renewalPrice,
          observations: extInfo.observations,
          isBestValue: extInfo.isBestValue,
        };
      });

      const batchResults = await Promise.all(promises);
      list.push(...batchResults);
    }

    setResults(list);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation?.isValid) return;

    setIsSearching(true);
    setShowTerminal(true);
    setSearchCompleted(false);
    setSelectedResult(null);

    // Run actual check in parallel background
    try {
      await runParallelQueries(validation.baseName);
    } catch (err) {
      console.error("Batch search error:", err);
    }
  };

  const handleTerminalComplete = () => {
    setShowTerminal(false);
    setIsSearching(false);
    setSearchCompleted(true);
  };

  const handleResetSearch = () => {
    setRawQuery("");
    setValidation(null);
    setSearchCompleted(false);
    setResults([]);
    setSelectedResult(null);
  };

  return (
    <motion.div
      layout
      id="buscador-dominios-bento"
      className="col-span-1 sm:col-span-2 md:col-span-4 mt-2"
    >
      <div className="border-4 border-black bg-[var(--c-surface)] text-[var(--c-text)] shadow-[4px_4px_0px_0px_#000] p-5 sm:p-6 w-full relative select-none">
        
        {/* Toggle Expansion header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-2 border-black/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-[10px] sm:text-xs uppercase bg-neo-cyan text-black px-2 py-1 shadow-[2px_2px_0px_0px_#000] border-2 border-black">
              Servicio de Dominios
            </span>
            <h2 className="font-display font-black text-sm uppercase text-[var(--c-text)]">
              Disponibilidad & Registro Competitivo
            </h2>
          </div>

          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("play-click"));
              }
              setIsExpanded(!isExpanded);
              if (isExpanded) handleResetSearch();
            }}
            className="font-mono text-[10px] font-black uppercase text-black border-2 border-black px-3 py-1 shadow-[2.5px_2.5px_0px_0px_#000] bg-neo-pink cursor-pointer hover:translate-x-[0.5px] hover:translate-y-[0.5px] active:translate-x-[1px] active:translate-y-[1px] transition-transform select-none"
          >
            {isExpanded ? "Cerrar Buscador" : "Abrir Buscador +"}
          </button>
        </div>

        {/* Compact View */}
        {!isExpanded && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <p className="font-sans text-xs sm:text-sm font-semibold text-[var(--c-text-muted)] max-w-2xl leading-relaxed">
              ¿Estás planeando tu próximo proyecto? Puedo ayudarte a buscar y registrar dominios competitivos con extensiones modernas (.dev, .com, .es, .cloud) aprovechando promociones especiales de registradores asociados.
            </p>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("play-click"));
                }
                setIsExpanded(true);
              }}
              className="font-display font-black text-xs uppercase border-3 border-black bg-neo-yellow text-black px-4 py-2 shadow-[3px_3px_0px_0px_#000] flex items-center gap-1 hover:translate-y-0.5 active:translate-y-1 transition-transform cursor-pointer flex-shrink-0"
            >
              Consultar Dominios <ChevronRight size={14} className="stroke-[3]" />
            </button>
          </div>
        )}

        {/* Expanded View */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              {/* Informative Intro text */}
              <div className="border-3 border-black bg-[var(--c-surface-hover)] p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] mb-5 text-left text-xs sm:text-sm font-semibold text-[var(--c-text-muted)] leading-relaxed space-y-2">
                <p>
                  <strong>💡 ¿Cómo funciona este servicio?</strong> No soy un registrador oficial de dominios ni vendo dominios de forma automatizada. Como desarrollador Full Stack, trabajo diariamente con registradores compatibles (como Cloudflare Registrar, Porkbun, Namecheap) y tengo acceso a promociones de primer año altamente competitivas.
                </p>
                <p>
                  Busca tu dominio preferido abajo. Si está disponible, podrás solicitarlo y yo me encargaré de adquirirlo y transferirlo directamente a tu cuenta de Cloudflare (o tu proveedor elegido) sin recargos comerciales abusivos.
                </p>
              </div>

              {/* Domain Input Search Form */}
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 items-stretch max-w-3xl mx-auto mb-6">
                <div className="flex-grow flex flex-col gap-1 relative text-left">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={rawQuery}
                      onChange={(e) => setRawQuery(e.target.value)}
                      onBlur={handleBlur}
                      disabled={isSearching}
                      placeholder="ejemplo: mi-proyecto, midominio.dev o www.marca.es"
                      className="w-full border-3 border-black p-3 pr-28 font-mono text-xs sm:text-sm focus:outline-none focus:bg-[var(--c-surface-hover)] bg-[var(--c-surface)] text-[var(--c-text)] shadow-[inset_3px_3px_0px_0px_rgba(0,0,0,0.15)]"
                    />
                    
                    {/* Clear Button */}
                    {rawQuery && (
                      <button
                        type="button"
                        onClick={handleResetSearch}
                        className="absolute right-3 p-1 text-[var(--c-text-muted)] hover:text-[var(--c-text)] cursor-pointer"
                      >
                        <X size={16} className="stroke-[2.5]" />
                      </button>
                    )}
                  </div>

                  {/* Validation State Badge */}
                  {validation && (
                    <div className="mt-1 flex items-center gap-1.5 min-h-[16px]">
                      {validation.isValid ? (
                        <span className="font-mono text-[9px] uppercase font-bold text-neo-green flex items-center gap-0.5">
                          ✓ Nombre válido: <span className="underline">{validation.baseName}</span> {validation.detectedExtension && `(Ext: ${validation.detectedExtension})`}
                        </span>
                      ) : (
                        <span className="font-mono text-[9px] uppercase font-bold text-neo-pink flex items-center gap-0.5">
                          ⚠ {validation.error}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSearching || !validation?.isValid}
                  className="border-3 border-black bg-neo-yellow text-black font-display font-black text-xs uppercase px-5 py-3 shadow-[3px_3px_0px_0px_#000] hover:translate-y-0.5 active:translate-y-1 disabled:opacity-40 disabled:pointer-events-none transition-transform flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap h-[45px] sm:h-auto"
                >
                  Buscar disponibilidad <ArrowRight size={14} className="stroke-[3]" />
                </button>
              </form>

              {/* Simulation CLI Terminal */}
              {showTerminal && (
                <DomainSearchTerminal 
                  domainName={validation?.baseName || rawQuery} 
                  onComplete={handleTerminalComplete} 
                />
              )}

              {/* Search Results */}
              {searchCompleted && (
                <div className="space-y-6">
                  <div className="text-left">
                    <h3 className="font-display font-black text-sm uppercase text-[var(--c-text)] flex items-center gap-1.5">
                      🔎 Resultados para: <span className="bg-neo-cyan text-black border-2 border-black px-2 py-0.5 shadow-[2px_2px_0px_0px_#000] text-xs font-mono font-bold">{validation?.baseName}</span>
                    </h3>
                  </div>

                  <DomainResultsTable 
                    results={results} 
                    onSelect={(res) => setSelectedResult(res)} 
                    selectedResult={selectedResult}
                  />

                  {/* Pricing disclaimer note */}
                  <div className="text-left font-sans text-[10px] font-bold text-[var(--c-text-muted)] italic leading-tight border-l-3 border-neo-cyan pl-2">
                    * Los precios y promociones del primer año mostrados son orientativos en base a las tarifas actuales de registradores colaboradores y quedan confirmados en el momento exacto del registro definitivo.
                  </div>

                  {/* Solicitation Details Panel */}
                  {selectedResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-3 border-black p-5 bg-[var(--c-surface-hover)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 max-w-xl">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-black text-[var(--c-text)] bg-white border border-black px-2 py-0.5 shadow-[1.5px_1.5px_0px_0px_#000]">
                            {validation?.baseName}{selectedResult.extension}
                          </span>
                          <span className="font-display font-black text-[8px] uppercase bg-neo-green text-black border border-black px-1.5 py-0.5 shadow-[1px_1px_0px_0px_#000]">
                            Disponible
                          </span>
                        </div>
                        
                        <p className="font-sans text-xs text-[var(--c-text-muted)] leading-relaxed">
                          Has seleccionado registrar este dominio por un costo estimado de <strong>{selectedResult.firstYearPrice} €</strong> el primer año (renovación aprox. de {selectedResult.renewalPrice} €).
                        </p>
                        
                        <div className="flex items-center gap-1.5 font-mono text-[9px] text-neo-pink font-bold">
                          <ShieldCheck size={12} className="stroke-[2.5]" /> El precio final dependerá de la oferta activa del registrador al comprar.
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            window.dispatchEvent(new CustomEvent("play-click"));
                          }
                          setIsSolicitationOpen(true);
                        }}
                        className="border-3 border-black bg-neo-pink text-black font-display font-black text-xs uppercase px-5 py-3 shadow-[3px_3px_0px_0px_#000] hover:translate-y-0.5 active:translate-y-1 transition-transform flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap self-start md:self-center"
                      >
                        Solicitar Dominio <ChevronRight size={14} className="stroke-[3]" />
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Solicitation Form Modal */}
      {selectedResult && (
        <DomainSolicitationModal
          isOpen={isSolicitationOpen}
          onClose={() => setIsSolicitationOpen(false)}
          selectedDomain={`${validation?.baseName}${selectedResult.extension}`}
          selectedExtension={selectedResult.extension}
          priceEstimate={selectedResult.firstYearPrice}
        />
      )}
    </motion.div>
  );
};
