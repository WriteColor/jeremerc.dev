"use client";

import React from "react";

interface SkillIconProps {
  name: string;
  className?: string;
}

export const SkillIcon: React.FC<SkillIconProps> = ({ name, className = "w-6 h-6" }) => {
  const normName = name.toLowerCase().trim();

  switch (normName) {
    case "react":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <ellipse cx="50" cy="50" rx="8" ry="22" stroke="#61DAFB" strokeWidth="3" transform="rotate(0 50 50)"/>
          <ellipse cx="50" cy="50" rx="8" ry="22" stroke="#61DAFB" strokeWidth="3" transform="rotate(60 50 50)"/>
          <ellipse cx="50" cy="50" rx="8" ry="22" stroke="#61DAFB" strokeWidth="3" transform="rotate(120 50 50)"/>
          <circle cx="50" cy="50" r="4.5" fill="#61DAFB"/>
        </svg>
      );
    case "next.js":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="50" cy="50" r="45" fill="black" stroke="currentColor" strokeWidth="3.5"/>
          <path d="M72 70L41 33H33V67H39V43L67 76C69 74.5 70.5 72.5 72 70Z" fill="white"/>
          <rect x="61" y="33" width="6" height="34" fill="white"/>
        </svg>
      );
    case "astro":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M50 5C45 27 32 40 15 50C32 60 45 73 50 95C55 73 68 60 85 50C68 40 55 27 50 5Z" fill="url(#astro-grad-official)"/>
          <path d="M50 30C48 40 40 48 30 50C40 52 48 60 50 70C52 60 60 52 70 50C60 48 52 40 50 30Z" fill="white" opacity="0.3"/>
          <defs>
            <linearGradient id="astro-grad-official" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF5E00"/>
              <stop offset="50%" stopColor="#F9004B"/>
              <stop offset="100%" stopColor="#8000FF"/>
            </linearGradient>
          </defs>
        </svg>
      );
    case "vite":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M10 20L50 88L90 20H10Z" fill="url(#vite-grad-official)"/>
          <path d="M52 10L28 52H48L40 90L76 40H58L65 10H52Z" fill="#FFDE4D"/>
          <defs>
            <linearGradient id="vite-grad-official" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4158D0"/>
              <stop offset="50%" stopColor="#C850C0"/>
              <stop offset="100%" stopColor="#FFCC70"/>
            </linearGradient>
          </defs>
        </svg>
      );
    case "typescript":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="100" height="100" rx="8" fill="#3178C6"/>
          <path d="M35 70V38H24V30H51V38H40V70H35ZM53 50C53 41.5 59 34 69 34C79 34 83 41.5 83 48H74.5C74.5 44 72 41.5 69 41.5C65 41.5 62 44.5 62 50C62 55.5 65 58.5 69 58.5C73 58.5 74.5 56 74.5 52H83C83 58.5 78 66 69 66C59 66 53 58.5 53 50Z" fill="white"/>
        </svg>
      );
    case "javascript":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="100" height="100" rx="8" fill="#F7DF1E"/>
          <path d="M30 60C32 64 35 66 39 66C43 66 45 64 45 59V30H51V59C51 68 45 72 38 72C32 72 27 68 25 60H30ZM56 55C56 50.5 59 47.5 64 45.5C70 43.5 74 42.5 74 39.5C74 36.5 72 35.5 69 35.5C65 35.5 63 37.5 62 40.5H56C57 33.5 62 29.5 69 29.5C76 29.5 80 33.5 80 39.5C80 45.5 76 47.5 70 50.5C65 52.5 62 53.5 62 56.5C62 59.5 65 60.5 69 60.5C73 60.5 75 58.5 76 55.5H82C81 62.5 76 66.5 69 66.5C62 66.5 56 62.5 56 55Z" fill="black"/>
        </svg>
      );
    case "tailwind css":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M15 50C15 35 25 25 45 25C55 25 60 30 65 35C75 25 85 25 85 45C85 60 75 70 55 70C45 70 40 65 35 60C25 70 15 70 15 50Z" fill="#38B2AC" opacity="0.6"/>
          <path d="M25 60C25 48 33 40 49 40C57 40 61 44 65 48C73 40 81 40 81 56C81 68 73 76 57 76C49 76 45 72 41 68C33 76 25 76 25 60Z" fill="#06B6D4"/>
        </svg>
      );
    case "shadcn/ui":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M12 12H88V32H12V12Z" fill="currentColor"/>
          <path d="M12 42H62V62H12V42Z" fill="currentColor"/>
          <path d="M12 72H37V92H12V72Z" fill="currentColor"/>
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
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M20 20L80 50L20 80V20Z" fill="#00E599"/>
          <rect x="52" y="20" width="28" height="10" fill="currentColor"/>
          <rect x="52" y="70" width="28" height="10" fill="currentColor"/>
        </svg>
      );
    case "framer motion":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M15 15H85L50 50L15 15Z" fill="url(#motion-grad-official)"/>
          <path d="M15 50L50 50L85 85H15V50Z" fill="url(#motion-grad-official)"/>
          <path d="M50 50L85 15V50L50 50Z" fill="url(#motion-grad-official)" opacity="0.8"/>
          <defs>
            <linearGradient id="motion-grad-official" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F000FF"/>
              <stop offset="100%" stopColor="#7000FF"/>
            </linearGradient>
          </defs>
        </svg>
      );
    case "three.js":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M50 8L92 80L8 80L50 8Z" stroke="currentColor" strokeWidth="4.5" fill="none"/>
          <path d="M50 24L82 74H18L50 24Z" fill="currentColor"/>
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
    case "node.js":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M50 8L86 29V71L50 92L14 71V29L50 8Z" fill="#339933"/>
          <path d="M50 20L76 35V65L50 80L24 65V35L50 20Z" fill="white" opacity="0.25"/>
          <circle cx="50" cy="50" r="6" fill="white"/>
        </svg>
      );
    case "laravel (php)":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="100" height="100" rx="10" fill="#FF2D20"/>
          <path d="M22 22H78V78H22V22Z" stroke="white" strokeWidth="4.5" fill="none"/>
          <path d="M34 34H66V66H34V34Z" fill="white"/>
        </svg>
      );
    case "python":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M50 10C34 10 31 15 31 25H50V31H24C14 31 10 36 10 50C10 64 14 69 24 69H31V61C31 51 34 47 44 47H67C77 47 79 42 79 31C79 20 77 10 50 10Z" fill="#3776AB"/>
          <path d="M50 90C66 90 69 85 69 75H50V69H76C86 69 90 64 90 50C90 36 86 31 76 31H69V39C69 49 66 53 56 53H33C23 53 21 58 21 69C21 80 23 90 50 90Z" fill="#FFD343"/>
          <circle cx="40" cy="20" r="3.5" fill="white"/>
          <circle cx="60" cy="80" r="3.5" fill="black"/>
        </svg>
      );
    case "c++":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M50 4L91 24V76L50 96L9 76V24L50 4Z" fill="#00599C"/>
          <path d="M35 50C35 39 42 30 53 30C61 30 66 36 68 40H59C57 38 55 37 53 37C47 37 42 42 42 50C42 58 47 63 53 63C55 63 57 62 59 60H68C66 64 61 70 53 70C42 70 35 61 35 50Z" fill="white"/>
          <path d="M72 45H80V53H72V61H64V53H56V45H64V37H72V45Z" fill="#0079C1"/>
        </svg>
      );
    case "java (swing)":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M32 45C32 34 47 34 50 18C42 23 37 30 32 45Z" fill="#EA2D2E"/>
          <path d="M44 40C44 29 57 29 60 8C52 13 49 23 44 40Z" fill="#5382A1"/>
          <path d="M30 75C41 78 61 78 71 75C76 72 66 68 51 68C36 68 26 72 30 75Z" fill="#F89820"/>
          <path d="M19 52C19 63 66 63 76 52C81 48 71 45 47 45C24 45 19 48 19 52Z" fill="#007396"/>
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
    case "supabase":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M62 8L20 54H51L38 92L80 46H49L62 8Z" fill="#3ECF8E"/>
        </svg>
      );
    case "neon db":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect width="100" height="100" rx="10" fill="black"/>
          <path d="M28 20L72 42V82L28 60V20Z" fill="#00E599"/>
          <path d="M72 42L92 32L48 10L28 20L72 42Z" fill="#00E599" opacity="0.6"/>
        </svg>
      );
    case "postgresql":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M76 50C76 39 71 29 61 24C51 19 38 21 30 29C20 39 18 54 24 64C30 74 45 77 55 74C65 71 76 61 76 50Z" fill="#336791"/>
          <path d="M30 29C25 34 22 44 22 54C22 61 25 67 30 69C28 64 27 57 29 51C32 44 37 41 43 39C37 37 33 34 30 29Z" fill="white" opacity="0.35"/>
          <circle cx="45" cy="48" r="2.5" fill="white"/>
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M10 50C10 65 22 75 45 75C75 75 90 55 90 40C80 40 75 42 70 40C65 38 60 30 55 30C50 30 45 35 40 35C30 35 25 30 20 30C15 30 10 38 10 50Z" fill="#2496ED"/>
          <rect x="26" y="20" width="7" height="7" fill="white"/>
          <rect x="35" y="20" width="7" height="7" fill="white"/>
          <rect x="44" y="20" width="7" height="7" fill="white"/>
          <rect x="30" y="11" width="7" height="7" fill="white"/>
          <rect x="39" y="11" width="7" height="7" fill="white"/>
        </svg>
      );
    case "cloudflare workers":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M50 12C55 23 70 28 86 28C81 44 76 59 50 86C24 59 19 44 14 28C30 28 45 23 50 12Z" fill="#F38020" opacity="0.75"/>
          <path d="M50 28C53 36 65 40 76 40C72 50 68 60 50 79C32 60 28 50 24 40C35 40 47 36 50 28Z" fill="#F38020"/>
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M85 45L55 15C52 12 48 12 45 15L15 45C12 48 12 52 15 55L45 85C48 88 52 88 55 85L85 55C88 52 88 48 85 45Z" fill="#F05032"/>
          <circle cx="50" cy="50" r="7" fill="white"/>
          <circle cx="35" cy="65" r="7" fill="white"/>
          <circle cx="50" cy="31" r="7" fill="white"/>
          <path d="M35 65V50C35 42 42 35 50 31" stroke="white" strokeWidth="4.5" fill="none"/>
          <path d="M50 31V50" stroke="white" strokeWidth="4.5"/>
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
