"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, CornerDownLeft } from "lucide-react";

interface InteractiveTerminalProps {
  onScrollToProjects: () => void;
  onOpenContact: () => void;
  onOpenSpecs: () => void;
  onOpenReferences: () => void;
  onToggleTheme: () => void;
  onOpenSkill: (name: string) => void;
  onOpenDomains?: () => void;
}

interface CommandHistoryEntry {
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  onScrollToProjects,
  onOpenContact,
  onOpenSpecs,
  onOpenReferences,
  onToggleTheme,
  onOpenSkill,
  onOpenDomains,
}) => {
  const [history, setHistory] = useState<CommandHistoryEntry[]>([
    {
      command: "system_init",
      output: (
        <div className="text-(--c-text-muted)">
          Bienvenido al entorno interactivo de Jeremerc. Escribe <span className="text-neo-pink font-bold">help</span> para listar los comandos disponibles.
        </div>
      ),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [terminalState, setTerminalState] = useState<"idle" | "success" | "warning" | "error">("idle");
  const [shakeActive, setShakeActive] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const COMMANDS = [
    "help",
    "clear",
    "whoami",
    "about",
    "skills",
    "projects",
    "contact",
    "social",
    "theme",
    "pwd",
    "ls",
    "tree",
    "cat",
    "history",
    "date",
    "uptime",
    "neofetch",
    "specs",
    "references",
    "domains",
  ];

  // Exact real files from the repository
  const FILES: Record<string, string> = {
    "package.json": `{
  "name": "jeremerc.site",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@radix-ui/react-dialog": "^1.1.19",
    "@radix-ui/react-tooltip": "^1.2.12",
    "clsx": "^2.1.1",
    "framer-motion": "^12.42.2",
    "gsap": "^3.15.0",
    "lucide-react": "^1.23.0",
    "next": "16.2.10",
    "ogl": "^1.0.11",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "tailwind-merge": "^3.6.0"
  }
}`,
    "next.config.ts": `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ogl"]
};

export default nextConfig;`,
    "tsconfig.json": `{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`,
    "src/app/globals.css": `/* ═══════════════════════════════════════════════
   THEME DESIGN TOKENS
   ═══════════════════════════════════════════════ */
:root {
  --c-bg: #FFFFFF;
  --c-text: #000000;
  --c-border: #000000;
  --c-shadow: 0, 0, 0;
  --c-surface: #FFFFFF;
  --c-surface-hover: #F4F4F7;
  --c-text-muted: #55555B;
}

.dark {
  --c-bg: #121214;
  --c-text: #FFFFFF;
  --c-border: #FFFFFF;
  --c-shadow: 255, 255, 255;
  --c-surface: #1E1E22;
  --c-surface-hover: #2B2B30;
  --c-text-muted: #A1A1AA;
}`,
    "src/components/shapegrid.tsx": `// High-performance canvas 2D grid background with mouse interactions
const ShapeGrid: React.FC<ShapeGridProps> = ({
  direction = 'diagonal',
  speed = 0.3,
  squareSize = 48,
  hoverTrailAmount = 6,
  borderColor,
  hoverFillColor,
  backgroundColor,
  paused
}) => {
  // Canvas initialization, dynamic sizing, and window.mousemove tracking
  // ...
  return <canvas ref={canvasRef} className="shapegrid-canvas" />;
};`
  };

  const getSystemUptime = () => {
    if (typeof window === "undefined") return "0s";
    const performanceNow = window.performance.now();
    const sec = Math.floor(performanceNow / 1000);
    const min = Math.floor(sec / 60);
    const hrs = Math.floor(min / 60);
    return `${hrs}h ${min % 60}m ${sec % 60}s`;
  };

  // Scroll to bottom on history change without scrolling the main window
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (rawInput: string) => {
    const input = rawInput.trim();
    if (!input) return;

    // Add to command history
    setCmdHistory((prev) => [...prev, input]);
    setHistoryIndex(-1);

    const parts = input.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ");

    let output: React.ReactNode = "";
    let finalState: "success" | "warning" | "error" = "success";

    // Syntax validation
    if (!COMMANDS.includes(cmd)) {
      finalState = "error";
      output = `Comando no reconocido: "${cmd}". Escribe "help" para ver los comandos disponibles.`;
    } else {
      switch (cmd) {
        case "help":
          output = (
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-(--c-text-muted) font-mono text-[10px] sm:text-xs">
              <div><span className="text-neo-pink font-bold">help</span> - Muestra esta ayuda.</div>
              <div><span className="text-neo-pink font-bold">clear</span> - Limpia la consola.</div>
              <div><span className="text-neo-pink font-bold">whoami</span> - Muestra info del usuario.</div>
              <div><span className="text-neo-pink font-bold">about</span> - Sobre mí.</div>
              <div><span className="text-neo-pink font-bold">skills [tech]</span> - Lista o abre detalle.</div>
              <div><span className="text-neo-pink font-bold">projects</span> - Desplaza a Proyectos.</div>
              <div><span className="text-neo-pink font-bold">contact</span> - Abre formulario.</div>
              <div><span className="text-neo-pink font-bold">social</span> - Enlaces de redes.</div>
              <div><span className="text-neo-pink font-bold">theme</span> - Cambia modo Claro/Oscuro.</div>
              <div><span className="text-neo-pink font-bold">pwd</span> - Directorio actual.</div>
              <div><span className="text-neo-pink font-bold">ls</span> - Lista archivos reales.</div>
              <div><span className="text-neo-pink font-bold">tree</span> - Árbol de archivos.</div>
              <div><span className="text-neo-pink font-bold">cat [file]</span> - Lee archivo real del proyecto.</div>
              <div><span className="text-neo-pink font-bold">date</span> - Fecha actual.</div>
              <div><span className="text-neo-pink font-bold">uptime</span> - Tiempo de sesión web.</div>
              <div><span className="text-neo-pink font-bold">neofetch</span> - Especificaciones de la terminal.</div>
              <div><span className="text-neo-pink font-bold">specs</span> - Abre modal de especificaciones.</div>
              <div><span className="text-neo-pink font-bold">references</span> - Abre modal de testimonios.</div>
              <div><span className="text-neo-pink font-bold">domains</span> - Abre modal de dominios.</div>
            </div>
          );
          break;

        case "clear":
          setHistory([]);
          setInputValue("");
          setTerminalState("success");
          return;

        case "whoami":
          const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "Unknown Browser";
          const isMobile = /Mobile|Android|iPhone/i.test(userAgent) ? "Dispositivo Móvil" : "Computadora de Escritorio";
          output = (
            <div className="text-(--c-text-muted)">
              usuario: <span className="text-neo-cyan font-bold">guest@jeremerc.site</span><br />
              plataforma: {isMobile}<br />
              navegador: {userAgent.split(" ").slice(-2).join(" ")}
            </div>
          );
          break;

        case "about":
          output = (
            <div className="text-(--c-text-muted) leading-relaxed">
              Jeremerc - Desarrollador frontend creativo enfocado en crear interfaces robustas y dinámicas. Escribe <span className="text-neo-pink font-bold">cat package.json</span> para ver mi configuración del proyecto o <span className="text-neo-pink font-bold">skills</span> para mi catálogo técnico.
            </div>
          );
          break;

        case "skills":
          if (arg) {
            const validSkill = ["react", "next.js", "astro", "vite", "typescript", "javascript", "tailwind css", "shadcn/ui", "radix ui", "base ui", "framer motion", "three.js", "react bits", "node.js", "laravel (php)", "python", "c++", "java (swing)", "cargo.js", "supabase", "neon db", "postgresql", "docker", "cloudflare workers", "git"].find(
              s => s.toLowerCase() === arg.toLowerCase()
            );

            if (validSkill) {
              output = `Abriendo ficha técnica de ${validSkill}...`;
              setTimeout(() => onOpenSkill(validSkill), 400);
            } else {
              finalState = "warning";
              output = `Tecnología "${arg}" no encontrada en el catálogo. Intenta: skills React, skills Vite, etc.`;
            }
          } else {
            output = (
              <div className="text-(--c-text-muted)">
                Escribe <span className="text-neo-pink font-bold">skills [nombre]</span> para abrir ficha técnica:<br />
                - Frontend: <span className="text-neo-cyan font-bold">React, Next.js, Astro, Vite, TypeScript, JavaScript, Tailwind CSS, Shadcn/UI, Radix UI, Base UI, Framer Motion, Three.js, React Bits</span><br />
                - Backend/Tools: <span className="text-neo-pink font-bold">Node.js, Laravel (PHP), Python, C++, Java (Swing), Cargo.js, Supabase, Neon DB, PostgreSQL, Docker, Cloudflare Workers, Git</span>
              </div>
            );
          }
          break;

        case "projects":
          output = "Desplazando hacia la sección de Proyectos...";
          setTimeout(onScrollToProjects, 300);
          break;

        case "contact":
          output = "Desplegando el formulario de contacto...";
          setTimeout(onOpenContact, 300);
          break;

        case "social":
          output = (
            <div className="text-(--c-text-muted)">
              Enlaces de redes sociales:<br />
              - GitHub: <a href="https://github.com/WriteColor" target="_blank" rel="noopener" className="text-neo-cyan font-bold hover:underline">github.com/WriteColor</a><br />
              - Discord: <span className="text-neo-pink font-bold">@WriteColor (ID: 668521031731773460)</span><br />
              - Instagram: <a href="https://www.instagram.com/m.jere_echev/" target="_blank" rel="noopener" className="text-neo-yellow font-bold hover:underline">@m.jere_echev</a>
            </div>
          );
          break;

        case "theme":
          output = "Alternando temas cromáticos...";
          setTimeout(onToggleTheme, 300);
          break;

        case "pwd":
          output = "/home/jeremerc/portfolio";
          break;

        case "ls":
          output = (
            <div className="text-neo-cyan font-bold flex flex-wrap gap-4">
              <span>package.json</span>
              <span>next.config.ts</span>
              <span>tsconfig.json</span>
              <span>src/app/globals.css</span>
              <span>src/components/shapegrid.tsx</span>
            </div>
          );
          break;

        case "tree":
          output = (
            <div className="font-mono text-(--c-text-muted) leading-none">
              .<br />
              ├── package.json<br />
              ├── next.config.ts<br />
              ├── tsconfig.json<br />
              └── src<br />
              &nbsp;&nbsp;&nbsp; ├── app<br />
              &nbsp;&nbsp;&nbsp; │&nbsp;&nbsp; └── globals.css<br />
              &nbsp;&nbsp;&nbsp; └── components<br />
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; └── shapegrid.tsx
            </div>
          );
          break;

        case "cat":
          if (arg) {
            const content = FILES[arg.toLowerCase().trim()];
            if (content) {
              output = <pre className="whitespace-pre-wrap font-mono text-[9px] sm:text-[10px] text-zinc-300 bg-zinc-900/60 p-2 border border-zinc-800 rounded">{content}</pre>;
            } else {
              finalState = "warning";
              output = `cat: ${arg}: Archivo no encontrado. Escribe 'ls' para listar los archivos reales del proyecto.`;
            }
          } else {
            finalState = "warning";
            output = "Uso: cat [nombre_archivo] (ej: cat package.json)";
          }
          break;

        case "history":
          output = (
            <div className="text-(--c-text-muted)">
              {cmdHistory.map((cmdText, index) => (
                <div key={index}>{index + 1}  {cmdText}</div>
              ))}
            </div>
          );
          break;

        case "date":
          output = new Date().toLocaleString();
          break;

        case "uptime":
          output = `Sesión activa desde hace: ${getSystemUptime()}`;
          break;

        case "neofetch":
          output = (
            <div className="flex flex-col sm:flex-row gap-4 text-xs font-mono">
              <pre className="text-neo-pink leading-none hidden sm:block">
                {`   _                 
  (_)___ _ __ ___    
  | / _ \\ '__/ _ \\   
  | \\  __/ | |  __/   
  |  \\___|_|  \\___|   
 _/ |                 
|__/                  `}
              </pre>
              <div className="text-(--c-text-muted)">
                <span className="text-neo-cyan font-bold">guest@jeremerc.site</span><br />
                -----------------------<br />
                <span className="text-neo-yellow font-bold">OS:</span> Windows 11 IoT Enterprise LTSC<br />
                <span className="text-neo-yellow font-bold">Kernel:</span> Next.js App Router (BaseUI)<br />
                <span className="text-neo-yellow font-bold">Uptime:</span> {getSystemUptime()}<br />
                <span className="text-neo-yellow font-bold">Shell:</span> Interactive Port Shell v1.0.5<br />
                <span className="text-neo-yellow font-bold">Resolution:</span> 2560 x 1600 @ 240Hz<br />
                <span className="text-neo-yellow font-bold">CPU:</span> Intel Core Ultra 9 275HX (24)<br />
                <span className="text-neo-yellow font-bold">GPU:</span> NVIDIA GeForce RTX 5070 Ti<br />
                <span className="text-neo-yellow font-bold">Memory:</span> 32GB RAM DDR5
              </div>
            </div>
          );
          break;

        case "specs":
          output = "Abriendo el panel de especificaciones del equipo...";
          setTimeout(onOpenSpecs, 300);
          break;

        case "references":
          output = "Abriendo el panel de testimonios y referencias...";
          setTimeout(onOpenReferences, 300);
          break;

        case "domains":
          output = "Abriendo el panel de dominios registrados...";
          if (onOpenDomains) {
            setTimeout(onOpenDomains, 300);
          }
          break;
      }
    }

    setTerminalState(finalState);
    if (finalState === "error" || finalState === "warning") {
      setShakeActive(true);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("play-error"));
      }
      setTimeout(() => setShakeActive(false), 300);
    }
    // Return to idle state after glow effect duration
    setTimeout(() => setTerminalState("idle"), 1000);

    setHistory((prev) => [...prev, { command: input, output }]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(inputValue);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputValue(cmdHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistory.length === 0 || historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInputValue("");
      } else {
        setHistoryIndex(nextIndex);
        setInputValue(cmdHistory[nextIndex]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const inputVal = inputValue;
      if (!inputVal) return;

      const parts = inputVal.trim().split(/\s+/);

      // If we are autocompleting the main command
      if (parts.length === 1) {
        const inputLower = parts[0].toLowerCase();
        const matches = COMMANDS.filter((cmd) => cmd.startsWith(inputLower));
        if (matches.length === 1) {
          setInputValue(matches[0] + " ");
        } else if (matches.length > 1) {
          setHistory((prev) => [
            ...prev,
            {
              command: inputValue,
              output: <div className="text-(--c-text-muted) flex gap-4">{matches.map(m => <span key={m}>{m}</span>)}</div>,
            },
          ]);
        }
      }
      // If we are autocompleting arguments
      else {
        const cmd = parts[0].toLowerCase();
        const argPart = parts.slice(1).join(" ").toLowerCase();

        if (cmd === "cat") {
          const fileKeys = Object.keys(FILES);
          const matches = fileKeys.filter((f) => f.toLowerCase().startsWith(argPart));
          if (matches.length === 1) {
            setInputValue(`cat ${matches[0]}`);
          } else if (matches.length > 1) {
            setHistory((prev) => [
              ...prev,
              {
                command: inputValue,
                output: <div className="text-(--c-text-muted) flex gap-4">{matches.map(m => <span key={m}>{m}</span>)}</div>,
              },
            ]);
          }
        }
        else if (cmd === "skills") {
          const skillList = ["React", "Next.js", "Astro", "Vite", "TypeScript", "JavaScript", "Tailwind CSS", "Shadcn/UI", "Radix UI", "Base UI", "Framer Motion", "Three.js", "React Bits", "Node.js", "Laravel (PHP)", "Python", "C++", "Java (Swing)", "Cargo.js", "Supabase", "Neon DB", "PostgreSQL", "Docker", "Cloudflare Workers", "Git"];
          const matches = skillList.filter((s) => s.toLowerCase().startsWith(argPart));
          if (matches.length === 1) {
            setInputValue(`skills ${matches[0]}`);
          } else if (matches.length > 1) {
            setHistory((prev) => [
              ...prev,
              {
                command: inputValue,
                output: <div className="text-(--c-text-muted) flex gap-4">{matches.map(m => <span key={m}>{m}</span>)}</div>,
              },
            ]);
          }
        }
      }
    }
  };

  const getBorderColorClass = () => {
    switch (terminalState) {
      case "success":
        return "border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all duration-300";
      case "warning":
        return "border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.35)] transition-all duration-300";
      case "error":
        return "border-rose-600 shadow-[0_0_15px_rgba(225,29,72,0.35)] transition-all duration-300";
      default:
        return "border-(--c-border) shadow-inner";
    }
  };

  return (
    <div
      className={`border-4 p-3 bg-zinc-950 font-mono text-[10px] sm:text-[11px] font-bold text-zinc-100 flex flex-col h-72 relative transition-all duration-300 ${getBorderColorClass()} ${shakeActive ? "terminal-shake-active" : ""}`}
      onClick={() => inputRef.current?.focus()}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes terminal-shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        .terminal-shake-active {
          animation: terminal-shake 0.3s ease-in-out;
        }
      `}} />

      {/* Top Header bar */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 mb-2 select-none">
        <div className="flex items-center gap-1.5">
          <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${terminalState === 'error' ? 'bg-rose-500 animate-pulse' : 'bg-neo-pink'}`} />
          <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${terminalState === 'warning' ? 'bg-amber-400 animate-pulse' : 'bg-neo-yellow'}`} />
          <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${terminalState === 'success' ? 'bg-emerald-400 animate-pulse' : 'bg-neo-cyan'}`} />
          <span className="text-[9px] text-zinc-500 ml-1 flex items-center gap-1">
            <Terminal size={10} /> guest@jeremerc.site: ~
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2">
          {terminalState !== "idle" && (
            <span className={`text-[8px] uppercase tracking-wider px-1.5 py-0.5 border font-mono font-bold rounded ${terminalState === "success" ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" :
              terminalState === "warning" ? "text-amber-400 border-amber-500/30 bg-amber-500/10" :
                "text-rose-400 border-rose-500/30 bg-rose-500/10"
              }`}>
              {terminalState}
            </span>
          )}
        </div>
      </div>

      {/* Terminal Output scroll container */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto space-y-2 pr-1 select-text terminal-scrollbar"
      >
        {history.map((entry, idx) => (
          <div key={idx} className="space-y-0.5 animate-fadeIn">
            {entry.command !== "system_init" && (
              <div className="text-neo-pink">
                <span className="text-zinc-400">guest@jeremerc.site:~$</span> {entry.command}
              </div>
            )}
            <div className="pl-2">{entry.output}</div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Row */}
      <div className="flex items-center gap-1 border-t border-zinc-900 pt-1.5 mt-2">
        <span className="text-zinc-400 select-none">guest@jeremerc.site:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-zinc-100 border-none outline-none focus:ring-0 p-0 font-mono text-[10px] sm:text-[11px] font-bold"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          placeholder="escribe help..."
        />
        <CornerDownLeft size={10} className="text-zinc-600 select-none animate-pulse" />
      </div>
    </div>
  );
};

export default InteractiveTerminal;
