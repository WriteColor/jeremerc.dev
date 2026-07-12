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
    `$ dns-resolver --query="${domainName}" --verbosity=debug`,
    `[system] Initializing multi-registry bootstrap sequence for: "${domainName}"`,
    `[network] Establishing secure connection to public WHOIS/RDAP bootstrap index...`,
    `[rdap] Redirecting IANA bootstrap query to Verisign & regional registries...`,
    `[dns] querying: ${domainName}.com ... occupied (status: NOERROR, RTT: 124ms)`,
    `[dns] querying: ${domainName}.es ... available (status: NXDOMAIN, RTT: 145ms)`,
    `[dns] querying: ${domainName}.net ... occupied (status: NOERROR, RTT: 110ms)`,
    `[dns] querying: ${domainName}.dev ... available (status: NXDOMAIN, RTT: 198ms)`,
    `[dns] querying: ${domainName}.cloud ... available (status: NXDOMAIN, RTT: 167ms)`,
    `[dns] querying: ${domainName}.store ... available (status: NXDOMAIN, RTT: 215ms)`,
    `[system] Querying other TLD extension batches in background thread (34 checked)`,
    `[database] Loading active registrar discount promotions & margins...`,
    `[success] All operations successfully processed. Building sorted results table.`
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

    // Slightly faster delays to keep the UX snappy but realistic
    const delay = currentLineIdx === 0 ? 250 : Math.random() * 250 + 150; 
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
    <div className="border-4 border-black bg-black text-neo-green font-mono text-xs p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full max-w-full my-4 rounded-none text-left">
      <div 
        ref={containerRef}
        className="h-44 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neo-green/30 pr-1 select-none text-[11px]"
      >
        {lines.map((line, idx) => {
          let lineClass = "text-neo-green";
          if (line.includes("[error]")) lineClass = "text-neo-pink";
          if (line.includes("[success]")) lineClass = "text-neo-cyan font-bold";
          if (line.startsWith("$")) lineClass = "text-white font-bold";

          return (
            <div key={idx} className={`flex gap-1.5 items-start leading-relaxed ${lineClass}`}>
              <span className="text-neo-pink font-bold flex-shrink-0">&gt;</span>
              <span>{line}</span>
            </div>
          );
        })}
        
        {currentLineIdx < simulationSteps.length && (
          <div className="flex gap-1.5 items-center leading-relaxed text-neo-green">
            <span className="text-neo-pink font-bold">&gt;</span>
            <span className="bg-neo-green text-black px-1 font-bold animate-pulse text-[9px] uppercase tracking-wide">
              RUNNING
            </span>
            <span className="animate-pulse">_</span>
          </div>
        )}
      </div>
    </div>
  );
};
