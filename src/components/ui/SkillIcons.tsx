"use client";

import React from "react";
import { 
  Vite, 
  Framer, 
  Threejs, 
  NodejsIcon, 
  NeonIcon, 
  Python, 
  Java 
} from "@dev.icons/react";

interface SkillIconProps {
  name: string;
  className?: string;
}

const DEVICON_MAP: Record<string, string> = {
  "react": "devicon-react-original colored",
  "next.js": "devicon-nextjs-plain",
  "astro": "devicon-astro-plain colored",
  "javascript": "devicon-javascript-plain colored",
  "tailwind css": "devicon-tailwindcss-original colored",
  "laravel (php)": "devicon-laravel-original colored",
  "supabase": "devicon-supabase-plain colored",
  "postgresql": "devicon-postgresql-plain colored",
  "docker": "devicon-docker-plain colored",
  "cloudflare workers": "devicon-cloudflare-plain colored",
  "git": "devicon-git-plain colored",
};

export const SkillIcon: React.FC<SkillIconProps> = ({ name, className = "w-6 h-6" }) => {
  const normName = name.toLowerCase().trim();

  // 1. Direct imports from @dev.icons/react as specified
  switch (normName) {
    case "vite":
      return <Vite className={className} />;
    case "framer motion":
      // Framer Motion icon, black/white adaptivity
      return <Framer className={`${className} dark:text-white text-black`} />;
    case "three.js":
      return <Threejs className={`${className} dark:text-white text-black`} />;
    case "node.js":
      return <NodejsIcon className={className} />;
    case "neon db":
      return <NeonIcon className={className} />;
    case "python":
      return <Python className={className} />;
    case "java (swing)":
      return <Java className={className} />;
    case "typescript":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} shrink-0`}>
          <rect width="100" height="100" fill="#3178C6" rx="8" />
          <text 
            x="85" 
            y="85" 
            fill="white" 
            fontSize="52" 
            fontWeight="900" 
            fontFamily="system-ui, -apple-system, sans-serif" 
            textAnchor="end"
          >
            TS
          </text>
        </svg>
      );
    case "c++":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} shrink-0`}>
          <rect width="100" height="100" fill="#00599C" rx="8" />
          <text 
            x="50" 
            y="65" 
            fill="white" 
            fontSize="45" 
            fontWeight="900" 
            fontFamily="system-ui, -apple-system, sans-serif" 
            textAnchor="middle"
          >
            C++
          </text>
        </svg>
      );
  }

  // 2. Devicon font icon mapping
  if (DEVICON_MAP[normName]) {
    const style: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      lineHeight: "1",
    };

    if (className.includes("w-8") || className.includes("h-8")) {
      style.fontSize = "1.875rem";
    } else if (className.includes("w-6") || className.includes("h-6")) {
      style.fontSize = "1.5rem";
    } else if (className.includes("w-5") || className.includes("h-5")) {
      style.fontSize = "1.25rem";
    } else {
      style.fontSize = "1.5rem";
    }

    return <i className={`${DEVICON_MAP[normName]} ${className}`} style={style} />;
  }

  // 3. Fallback custom inline SVGs for shadcn, radix, baseui, react bits, cargo.js
  switch (normName) {
    case "shadcn/ui":
      return (
        <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="256" height="256" rx="60" fill="black"/>
          <path d="M208 128L128 208" stroke="white" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M192 48L48 192" stroke="white" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "radix ui":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M15 15H50V50H15V15Z" fill="currentColor"/>
          <circle cx="70" cy="32.5" r="17.5" fill="currentColor"/>
          <path d="M15 85C15 65.7 30.7 50 50 50C50 69.3 34.3 85 15 85Z" fill="currentColor"/>
        </svg>
      );
    case "base ui":
      return (
        <svg viewBox="0 0 17 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M9.5 7.015A.477.477 0 0 0 9 7.5V23a8 8 0 0 0 .5-15.985ZM8 9.8V23c-4.418 0-8-3.94-8-8.8V1c4.418 0 8 3.94 8 8.8Z" />
        </svg>
      );
    case "react bits":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M50 8L63 37L92 50L63 63L50 92L37 63L8 50L37 37L50 8Z" fill="url(#bits-grad-official)"/>
          <circle cx="50" cy="50" r="10" fill="white"/>
          <defs>
            <linearGradient id="bits-grad-official" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F5FF"/>
              <stop offset="50%" stopColor="#FF007F"/>
              <stop offset="100%" stopColor="#FFE600"/>
            </linearGradient>
          </defs>
        </svg>
      );
    case "cargo.js":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M50 8L86 29V71L50 92L14 71V29L50 8Z" stroke="currentColor" strokeWidth="5" fill="none"/>
          <path d="M50 8V50L86 29M50 50L14 29M50 50V92" stroke="currentColor" strokeWidth="5"/>
          <rect x="42" y="32" width="16" height="16" fill="currentColor"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M60 10L20 55H50L40 90L80 45H50L60 10Z" fill="#FFDE4D" stroke="currentColor" strokeWidth="3"/>
        </svg>
      );
  }
};

export default SkillIcon;
