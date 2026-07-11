import React, { useEffect, useState, useRef } from "react";

interface DomainSearchTerminalProps {
  onComplete: () => void;
  domainName: string;
}

export const DomainSearchTerminal: React.FC<DomainSearchTerminalProps> = ({ onComplete, domainName }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const simulationSteps = [
    `Initializing domain lookup query for: "${domainName}"`,
    "Connecting to compatible API registradores (Cloudflare, Namecheap, Porkbun)...",
    "Resolving active DNS records via HTTPS query...",
    "Querying availability for standard TLD extensions...",
    "Applying active seasonal coupons and promotional rates...",
    "Normalizing wholesale prices and margins...",
    "Query complete. Generating neobrutalist results table..."
  ];

  useEffect(() => {
    setLines([]);
    setCurrentLineIdx(0);
  }, [domainName]);

  useEffect(() => {
    if (currentLineIdx >= simulationSteps.length) {
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }

    const delay = currentLineIdx === 0 ? 300 : Math.random() * 500 + 400; // randomized delay for realistic feel
    const timer = setTimeout(() => {
      setLines((prev) => [...prev, simulationSteps[currentLineIdx]]);
      setCurrentLineIdx((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentLineIdx]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="border-3 border-black bg-black text-neo-green font-mono text-xs p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full max-w-full my-4 rounded-none text-left">
      <div className="flex items-center justify-between border-b-2 border-neo-green/30 pb-2 mb-3">
        <span className="text-[10px] uppercase font-black tracking-wider text-neo-green">
          ⚡ DOMAIN RESOLVER CLI v1.0.4
        </span>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-neo-pink border border-black inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-neo-yellow border border-black inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-neo-cyan border border-black inline-block"></span>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="h-44 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neo-green/30 pr-1 select-none"
      >
        {lines.map((line, idx) => (
          <div key={idx} className="flex gap-2 items-start leading-relaxed">
            <span className="text-neo-pink font-bold flex-shrink-0">&gt;</span>
            <span>{line}</span>
          </div>
        ))}
        {currentLineIdx < simulationSteps.length && (
          <div className="flex gap-2 items-center leading-relaxed">
            <span className="text-neo-pink font-bold">&gt;</span>
            <span className="bg-neo-green text-black px-1 font-bold animate-pulse text-[10px] uppercase">
              Procesando
            </span>
            <span className="animate-ping text-[10px]">...</span>
          </div>
        )}
      </div>
    </div>
  );
};
