import React from "react";
import { Check, X, AlertCircle, Loader2 } from "lucide-react";
import { DomainResult } from "./DomainData";

export interface DomainResultsTableProps {
  results: DomainResult[];
  onSelect: (result: DomainResult) => void;
  selectedResults: DomainResult[];
  baseName: string;
  searchedExtension?: string;
  onOpenDetails: (domainName: string) => void;
}

export const DomainResultsTable: React.FC<DomainResultsTableProps> = ({
  results,
  onSelect,
  selectedResults,
  baseName,
  searchedExtension,
  onOpenDetails,
}) => {
  // Check if any domain in results is currently loading
  const isAnyLoading = results.some(r => r.isAvailable === "loading");

  // Keep stable order if any domain is still loading (except forcing searchedExtension first).
  // Otherwise, sort available ones cheapest-first, then unavailable ones, then errors.
  const sortedResults = [...results].sort((a, b) => {
    // 1. Force the exact searched extension to always float to the top
    if (searchedExtension) {
      const isSearchedA = a.extension.toLowerCase() === searchedExtension.toLowerCase();
      const isSearchedB = b.extension.toLowerCase() === searchedExtension.toLowerCase();
      if (isSearchedA !== isSearchedB) return isSearchedA ? -1 : 1;
    }

    if (isAnyLoading) return 0; // Stable order for other rows during loading

    // 2. Available first
    const availA = a.isAvailable === true ? 1 : 0;
    const availB = b.isAvailable === true ? 1 : 0;
    if (availA !== availB) return availB - availA;

    // 3. Errors last
    const errA = a.isAvailable === "error" ? 1 : 0;
    const errB = b.isAvailable === "error" ? 1 : 0;
    if (errA !== errB) return errA - errB;

    // 4. Sort available ones by price (cheapest first)
    if (a.isAvailable === true && b.isAvailable === true) {
      return a.firstYearPrice - b.firstYearPrice;
    }

    return 0;
  });

  return (
    <div className="w-full overflow-x-auto border-3 border-black shadow-[4px_4px_0px_0px_#000] bg-(--c-surface) my-4">
      <table className="w-full text-left border-collapse min-w-[500px]">
        <thead>
          <tr className="border-b-3 border-black bg-(--c-surface-hover)">
            <th className="p-3 font-display font-black text-[10px] sm:text-xs uppercase tracking-wider text-(--c-text) border-r-2 border-black w-24">Extensión</th>
            <th className="p-3 font-display font-black text-[10px] sm:text-xs uppercase tracking-wider text-(--c-text) border-r-2 border-black w-32">Estado</th>
            <th className="p-3 font-display font-black text-[10px] sm:text-xs uppercase tracking-wider text-(--c-text) border-r-2 border-black w-40">Precio (1er Año)</th>
            <th className="p-3 font-display font-black text-[10px] sm:text-xs uppercase tracking-wider text-(--c-text) border-r-2 border-black w-28">Renovación</th>
            <th className="p-3 font-display font-black text-[10px] sm:text-xs uppercase tracking-wider text-(--c-text) text-center w-24">Acción</th>
          </tr>
        </thead>
        <tbody>
          {sortedResults.map((res, idx) => {
            const isSelected = selectedResults.some(r => r.extension === res.extension);
            const isBestValue = res.isBestValue && res.isAvailable === true;

            return (
              <tr 
                key={idx}
                className={`border-b-2 border-black/10 hover:bg-(--c-surface-hover)/40 transition-colors ${
                  isSelected ? "bg-neo-cyan/10" : ""
                }`}
              >
                {/* Extension */}
                <td className="p-3 font-mono font-bold text-xs text-(--c-text) border-r-2 border-black/10 whitespace-nowrap">
                  <div className="flex items-center gap-0.5">
                    <span className="text-(--c-text-muted) font-normal">{baseName}</span>
                    <span className="text-(--c-text) font-black">{res.extension}</span>
                    {isBestValue && (
                      <span className="bg-neo-yellow text-black border border-black font-display font-black text-[7px] uppercase px-1 py-0.5 shadow-[1px_1px_0px_0px_#000] scale-90 ml-1">
                        Top
                      </span>
                    )}
                  </div>
                </td>

                <td className="p-3 border-r-2 border-black/10">
                  {res.isAvailable === "loading" ? (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 border border-black bg-neo-cyan/20 text-(--c-text) font-display font-black text-[8px] sm:text-[9px] uppercase shadow-[1px_1px_0px_0px_#000] animate-pulse">
                      <Loader2 size={10} className="stroke-3 animate-spin" /> Buscando
                    </span>
                  ) : res.isAvailable === true ? (
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 border border-black bg-neo-green text-black font-display font-black text-[8px] sm:text-[9px] uppercase shadow-[1px_1px_0px_0px_#000]">
                        <Check size={10} className="stroke-3" /> Disponible
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (typeof window !== "undefined") {
                            window.dispatchEvent(new CustomEvent("play-click"));
                          }
                          onOpenDetails(`${baseName}${res.extension}`);
                        }}
                        className="font-mono text-[9px] text-neo-cyan hover:underline cursor-pointer bg-transparent border-none p-0 flex items-center gap-0.5"
                      >
                        [Ficha]
                      </button>
                    </div>
                  ) : res.isAvailable === false ? (
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 border border-black bg-neo-pink text-black font-display font-black text-[8px] sm:text-[9px] uppercase shadow-[1px_1px_0px_0px_#000]">
                        <X size={10} className="stroke-3" /> Registrado
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (typeof window !== "undefined") {
                            window.dispatchEvent(new CustomEvent("play-click"));
                          }
                          onOpenDetails(`${baseName}${res.extension}`);
                        }}
                        className="font-mono text-[9px] text-neo-cyan hover:underline cursor-pointer bg-transparent border-none p-0 flex items-center gap-0.5"
                      >
                        [Ficha]
                      </button>
                    </div>
                  ) : (
                    <span 
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 border border-black bg-neo-yellow text-black font-display font-black text-[8px] sm:text-[9px] uppercase shadow-[1px_1px_0px_0px_#000] cursor-help"
                      title="Inconclusivo: Consultas directas al puerto 43 (WHOIS) bloqueadas en esta red local/servidor. Para producción o desarrollo local restringido, añade WHOISJSON_API_KEY en tu .env"
                    >
                      <AlertCircle size={10} className="stroke-3" /> Error API
                    </span>
                  )}
                </td>

                {/* First year price */}
                <td className="p-3 font-mono font-bold text-xs text-(--c-text) border-r-2 border-black/10 whitespace-nowrap dark:text-emerald-400">
                  {res.isAvailable === true ? `$${res.firstYearPrice}` : "—"}
                </td>

                {/* Renewal price */}
                <td className="p-3 font-mono text-xs text-(--c-text-muted) border-r-2 border-black/10 whitespace-nowrap">
                  {res.isAvailable === true ? `$${res.renewalPrice}` : "—"}
                </td>

                {/* Action button */}
                <td className="p-2 text-center whitespace-nowrap">
                  {res.isAvailable === "loading" ? (
                    <span className="font-mono text-[9px] text-(--c-text-muted) uppercase animate-pulse select-none">
                      Cargando...
                    </span>
                  ) : res.isAvailable === true ? (
                    <button
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.dispatchEvent(new CustomEvent("play-click"));
                        }
                        onSelect(res);
                      }}
                      className={`font-display font-black text-[9px] sm:text-[10px] uppercase border-2 border-black px-2.5 py-1 shadow-[2px_2px_0px_0px_#000] cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-transform ${
                        isSelected 
                          ? "bg-neo-cyan text-black" 
                          : "bg-white text-black hover:bg-gray-50"
                      }`}
                    >
                      {isSelected ? "Elegido ✓" : "Elegir +"}
                    </button>
                  ) : (
                    <span className="font-mono text-[9px] text-(--c-text-subtle) uppercase select-none">
                      Bloqueado
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
