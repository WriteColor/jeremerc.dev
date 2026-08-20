import React, { useState, useEffect, useRef, useMemo } from "react";
import { Globe, ArrowRight, Laptop, Sparkles, ChevronRight, X, AlertTriangle, ShieldCheck, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { parseAndValidateDomain, ParsedDomain } from "./DomainValidator";
import { DOMAIN_EXTENSIONS, DomainExtensionInfo, DomainResult } from "./DomainData";
import { DomainResultsTable } from "./DomainResultsTable";
import { DomainSolicitationModal } from "./DomainSolicitationModal";
import { DomainDetailsModal } from "./DomainDetailsModal";

export const DomainSearchBento: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [rawQuery, setRawQuery] = useState("");
  const [validation, setValidation] = useState<ParsedDomain | null>(null);

  const [isSearching, setIsSearching] = useState(false);
  const [searchCompleted, setSearchCompleted] = useState(false);

  const [results, setResults] = useState<DomainResult[]>([]);
  const [selectedResults, setSelectedResults] = useState<DomainResult[]>([]);
  const [isSolicitationOpen, setIsSolicitationOpen] = useState(false);
  const [detailDomain, setDetailDomain] = useState<string | null>(null);
  const [hasScrolledToSummary, setHasScrolledToSummary] = useState(false);

  const summaryPanelRef = useRef<HTMLDivElement>(null);

  // Validate on query change
  useEffect(() => {
    if (!rawQuery) {
      setValidation(null);
      return;
    }
    const res = parseAndValidateDomain(rawQuery);
    setValidation(res);
  }, [rawQuery]);

  // Auto-scroll to solicitation panel when the first domain is selected
  useEffect(() => {
    if (selectedResults.length === 1 && !hasScrolledToSummary) {
      const timer = setTimeout(() => {
        const el = document.getElementById("solicitation-summary-panel");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "nearest" });
          setHasScrolledToSummary(true);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [selectedResults.length, hasScrolledToSummary]);

  // Clean raw query on blur if valid
  const handleBlur = () => {
    if (validation?.isValid) {
      setRawQuery(validation.cleanInput);
    }
  };

  // Perform DNS and RDAP check via our server-side API endpoint
  const checkDomainDns = async (base: string, ext: string): Promise<boolean | "error"> => {
    try {
      const fqdn = `${base}${ext}`;
      const res = await fetch(`/api/domains/check?domain=${fqdn}`);

      if (!res.ok) return "error";

      const data = await res.json();
      return data.isAvailable; // returns true (available), false (occupied), or "error"
    } catch (err) {
      console.warn(`Domain check failed for ${base}${ext}:`, err);
      return "error";
    }
  };

  // Process queries in parallel batches
  const runParallelQueries = async (baseName: string) => {
    const batchSize = 6;
    const extensionsToQuery = [...DOMAIN_EXTENSIONS];

    for (let i = 0; i < extensionsToQuery.length; i += batchSize) {
      const batch = extensionsToQuery.slice(i, i + batchSize);
      const promises = batch.map(async (extInfo) => {
        const isAvailable = await checkDomainDns(baseName, extInfo.extension);

        // Update results state dynamically in real-time
        setResults((prev) =>
          prev.map((r) =>
            r.extension === extInfo.extension
              ? { ...r, isAvailable }
              : r
          )
        );
      });

      await Promise.all(promises);
    }

    setIsSearching(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation?.isValid) return;

    setIsSearching(true);
    setSearchCompleted(true);
    setSelectedResults([]);
    setHasScrolledToSummary(false);

    // Initialize all domain extensions with 'loading' status
    const initialResults: DomainResult[] = DOMAIN_EXTENSIONS.map((extInfo) => ({
      extension: extInfo.extension,
      isAvailable: "loading",
      firstYearPrice: extInfo.firstYearPrice,
      renewalPrice: extInfo.renewalPrice,
      isBestValue: extInfo.isBestValue,
    }));
    setResults(initialResults);

    try {
      await runParallelQueries(validation.baseName);
    } catch (err) {
      console.error("Batch search error:", err);
      setIsSearching(false);
    }
  };

  const handleResetSearch = () => {
    setRawQuery("");
    setValidation(null);
    setSearchCompleted(false);
    setResults([]);
    setSelectedResults([]);
    setHasScrolledToSummary(false);
  };

  const handleSelectResult = (res: DomainResult) => {
    setSelectedResults((prev) => {
      const alreadySelected = prev.some((item) => item.extension === res.extension);
      if (alreadySelected) {
        return prev.filter((item) => item.extension !== res.extension);
      } else {
        return [...prev, res];
      }
    });
  };

  const totalPrice = selectedResults.reduce((sum, item) => sum + item.firstYearPrice, 0);

  const domainsToSolicit = useMemo(() => {
    return selectedResults.map((r) => ({
      fqdn: `${validation?.baseName || ""}${r.extension}`,
      price: r.firstYearPrice,
    }));
  }, [selectedResults, validation?.baseName]);

  return (
    <motion.div
      layout
      id="buscador-dominios-bento"
      className="col-span-1 sm:col-span-2 md:col-span-4 mt-2"
    >
      <div className="border-4 border-black bg-(--c-surface) text-(--c-text) shadow-[4px_4px_0px_0px_#000] p-5 sm:p-6 w-full relative select-none">

        {/* Header (Cerrar Buscador visible only when expanded) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-2 border-black/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-[10px] sm:text-xs uppercase bg-neo-cyan text-black px-2 py-1 shadow-[2px_2px_0px_0px_#000] border-2 border-black">
              Servicio de Dominios
            </span>
            <h2 className="font-display font-black text-sm uppercase text-(--c-text)">
              Disponibilidad & Registro Competitivo
            </h2>
          </div>

          {isExpanded && (
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("play-click"));
                }
                setIsExpanded(false);
                handleResetSearch();
              }}
              className="font-mono text-[10px] font-black uppercase text-black border-2 border-black px-3 py-1 shadow-[2.5px_2.5px_0px_0px_#000] bg-neo-pink cursor-pointer hover:translate-x-[0.5px] hover:translate-y-[0.5px] active:translate-x-px active:translate-y-px transition-transform select-none"
            >
              Cerrar Buscador
            </button>
          )}
        </div>

        {/* Compact View */}
        {!isExpanded && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <p className="font-sans text-xs sm:text-sm font-semibold text-(--c-text-muted) max-w-2xl leading-relaxed">
              ¿Estás planeando tu próximo proyecto? Puedo ayudarte a buscar y registrar dominios competitivos con extensiones modernas (.dev, .com, .es, .cloud) aprovechando promociones especiales de registradores asociados.
            </p>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("play-click"));
                }
                setIsExpanded(true);
              }}
              className="font-display font-black text-xs uppercase border-3 border-black bg-neo-yellow text-black px-4 py-2 shadow-[3px_3px_0px_0px_#000] flex items-center gap-1 hover:translate-y-0.5 active:translate-y-1 transition-transform cursor-pointer shrink-0"
            >
              Consultar Dominios <ChevronRight size={14} className="stroke-3" />
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
              {/* Informative Intro text (Porkbun mention removed) */}
              <div className="border-3 border-black bg-(--c-surface-hover) p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] mb-5 text-left text-xs sm:text-sm font-semibold text-(--c-text-muted) leading-relaxed space-y-2">
                <p>
                  <strong>💡 ¿Cómo funciona este servicio?</strong> No soy un registrador oficial de dominios ni vendo dominios de forma automatizada. Como desarrollador Full Stack, trabajo diariamente con registradores de confianza (como Cloudflare Registrar, Namecheap, entre otros) y tengo acceso a promociones de primer año altamente competitivas.
                </p>
                <p>
                  Busca tu dominio preferido abajo. Si está disponible, podrás solicitarlo y yo me encargaré de adquirirlo y transferirlo directamente a tu cuenta de Cloudflare (o tu proveedor elegido) sin recargos comerciales abusivos.
                </p>
              </div>

              {/* Domain Input Search Form */}
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 items-stretch max-w-3xl mx-auto mb-6">
                <div className="grow flex flex-col gap-1 relative text-left">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={rawQuery}
                      onChange={(e) => setRawQuery(e.target.value)}
                      onBlur={handleBlur}
                      disabled={isSearching}
                      placeholder="ejemplo: mi-proyecto, midominio.dev o www.marca.es"
                      className="w-full border-3 border-black p-3 pr-28 font-mono text-xs sm:text-sm focus:outline-none focus:bg-(--c-surface-hover) bg-(--c-surface) text-(--c-text) shadow-[inset_3px_3px_0px_0px_rgba(0,0,0,0.15)]"
                    />

                    {/* Clear Button */}
                    {rawQuery && (
                      <button
                        type="button"
                        onClick={handleResetSearch}
                        className="absolute right-3 p-1 text-(--c-text-muted) hover:text-(--c-text) cursor-pointer"
                      >
                        <X size={16} className="stroke-[2.5]" />
                      </button>
                    )}
                  </div>

                  {/* Validation State Badge */}
                  {validation && (
                    <div className="mt-1 flex items-center gap-1.5 min-h-4">
                      {validation.isValid ? (
                        <span className="font-mono text-[9px] uppercase font-bold text-neo-green flex items-center gap-0.5">
                          ✓ Nombre válido: <span className="underline lowercase">{validation.baseName}</span><span className="lowercase">{validation.detectedExtension && ` (Ext: ${validation.detectedExtension})`}</span>
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
                  className="border-3 border-black bg-neo-yellow text-black font-display font-black text-xs uppercase px-5 py-3 shadow-[3px_3px_0px_0px_#000] hover:translate-y-0.5 active:translate-y-1 disabled:opacity-40 disabled:pointer-events-none transition-transform flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap h-11.25 sm:h-auto"
                >
                  Buscar disponibilidad <ArrowRight size={14} className="stroke-3" />
                </button>
              </form>

              {/* Neobrutalist Loading State Indicator */}
              {isSearching && (
                <div className="border-3 border-black bg-neo-cyan text-black px-4 py-3 shadow-[3px_3px_0px_0px_#000] my-4 flex items-center justify-center gap-2.5 font-display font-black text-xs uppercase animate-pulse select-none">
                  <Loader2 className="animate-spin stroke-[3.5]" size={16} />
                  <span>Realizando validaciones cruzadas de registros en tiempo real...</span>
                </div>
              )}

              {/* Search Results */}
              {searchCompleted && (
                <div className="space-y-6">
                  <div className="text-left">
                    <h3 className="font-display font-black text-sm uppercase text-(--c-text) flex items-center gap-1.5">
                      🔎 Resultados para: <span className="bg-neo-cyan text-black border-2 border-black px-2 py-0.5 shadow-[2px_2px_0px_0px_#000] text-xs font-mono font-bold">{validation?.baseName}</span>
                    </h3>
                  </div>

                  <DomainResultsTable
                    results={results}
                    onSelect={handleSelectResult}
                    selectedResults={selectedResults}
                    baseName={validation?.baseName || ""}
                    searchedExtension={validation?.detectedExtension || undefined}
                    onOpenDetails={(fqdn) => setDetailDomain(fqdn)}
                  />

                  {/* Pricing disclaimer note */}
                  <div className="text-left font-sans text-[10px] font-bold text-(--c-text-muted) italic leading-relaxed border-l-3 border-neo-cyan pl-2 space-y-1.5">
                    <div>
                      * Los precios y promociones del primer año mostrados son orientativos en base a las tarifas actuales de registradores colaboradores y quedan confirmados en el momento exacto del registro definitivo.
                    </div>
                    <div className="text-neo-pink">
                      ⚠️ IMPORTANTE: Ciertos nombres de dominio (por su brevedad, palabras clave comunes o categorización "Premium" por parte del registro) pueden no estar permitidos para registro estándar o tener un costo de adquisición sustancialmente mayor al listado habitual.
                    </div>
                  </div>

                  {/* Solicitation Details Panel (Multi-Select Summary) */}
                  {selectedResults.length > 0 && (
                    <motion.div
                      id="solicitation-summary-panel"
                      ref={summaryPanelRef}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-3 border-black p-5 bg-(--c-surface-hover) shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left flex flex-col md:flex-row md:items-center justify-between gap-4 scroll-mt-20"
                    >
                      <div className="space-y-2 max-w-xl">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-display font-black text-[9px] uppercase bg-neo-green text-black border border-black px-1.5 py-0.5 shadow-[1px_1px_0px_0px_#000]">
                            Elegidos ({selectedResults.length})
                          </span>
                          <div className="flex gap-1.5 flex-wrap">
                            {selectedResults.map((item, idx) => (
                              <span
                                key={idx}
                                className="font-mono text-[11px] font-black text-(--c-text) bg-white border border-black px-2 py-0.5 shadow-[1.5px_1.5px_0px_0px_#000]"
                              >
                                {validation?.baseName}{item.extension} (${item.firstYearPrice})
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className="font-sans text-xs text-(--c-text-muted) leading-relaxed">
                          Has seleccionado registrar <strong>{selectedResults.length} dominio(s)</strong> por un costo total estimado de <strong className="text-neo-green dark:text-emerald-400 font-bold">${totalPrice} USD</strong> el primer año.
                        </p>

                        <div className="flex items-center gap-1.5 font-mono text-[9px] text-neo-pink font-bold">
                          <ShieldCheck size={12} className="stroke-[2.5]" /> El precio final quedará confirmado al registrarse según la promoción del momento.
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
                        Solicitar registro <ChevronRight size={14} className="stroke-3" />
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
      {selectedResults.length > 0 && (
        <DomainSolicitationModal
          isOpen={isSolicitationOpen}
          onClose={() => setIsSolicitationOpen(false)}
          selectedDomains={domainsToSolicit}
        />
      )}

      {/* Domain Info/Details Sheet Modal */}
      {detailDomain !== null && (
        <DomainDetailsModal
          isOpen={detailDomain !== null}
          onClose={() => setDetailDomain(null)}
          domainName={detailDomain}
        />
      )}
    </motion.div>
  );
};
