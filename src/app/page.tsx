"use client";

import React, { useState, useEffect, useRef, lazy, Suspense, useMemo, useCallback } from "react";
import {
  MessageSquare,
  Lock,
  Unlock,
  ExternalLink,
  X,
  Sparkles,
  Cpu,
  Globe,
  Layers,
  Zap,
  CircleDollarSign,
  Clock,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Code,
  Calendar,
  BookOpen,
  Award,
  Terminal,
  Target,
  Sun,
  Moon,
  ChevronLeft,
  Laptop,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Play,
  Pause,
  Volume2,
  VolumeX
} from "lucide-react";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import ShapeGridBackground from "@/components/backgrounds/ShapeGridBackground";
import PixelCard from "@/components/ui/PixelCard";
import DecayCard from "@/components/ui/DecayCard";
import CardSwap from "@/components/ui/CardSwap";
import LogoLoop from "@/components/ui/LogoLoop";
import ContactForm from "@/components/forms/ContactForm";
import InteractiveTerminal from "@/components/terminal/InteractiveTerminal";
import { DomainSearchBento } from "@/components/domains/DomainSearchBento";

const SpecsModal = lazy(() => import("@/components/modals/SpecsModal").then(m => ({ default: m.SpecsModal })));
const SkillDetailModal = lazy(() => import("@/components/modals/SkillDetailModal").then(m => ({ default: m.SkillDetailModal })));
const ReferencesModal = lazy(() => import("@/components/modals/ReferencesModal"));
import { REFERENCES_DB } from "@/components/modals/ReferencesModal";
const DomainsModal = lazy(() => import("@/components/modals/DomainsModal").then(m => ({ default: m.DomainsModal })));

import CountUp from "@/components/ui/CountUp";
import { type Project, PROJECTS, getProjectStatusColor } from "@/data/projects";
import BioProjectDetailModal from "@/components/modals/BioProjectDetailModal";

const SKILLS_FRONT = ["React", "Next.js", "Astro", "Vite", "TypeScript", "JavaScript", "Tailwind CSS", "Shadcn/UI", "Radix UI", "Base UI", "Framer Motion", "Three.js", "React Bits"];
const SKILLS_BACK = ["Node.js", "Laravel (PHP)", "Python", "C++", "Java (Swing)", "Cargo.js", "Supabase", "Neon DB", "PostgreSQL", "Docker", "Cloudflare Workers", "Git"];

// Inline brand icon SVGs to avoid Lucide version export issues
const GithubIcon = ({ className = "h-8 w-8" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const InstagramIcon = ({ className = "h-8 w-8" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const DiscordIcon = ({ className = "h-8 w-8" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    {/* Body of Clyde (Official Simple Icons path, unstretched 24x24) */}
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />

    {/* Eyes matching the blue card background exactly, avoiding off-color spots */}
    <circle cx="8.02" cy="12.92" r="1.38" className="fill-[#5865F2] group-hover:fill-[#4752C4] transition-colors duration-200" />
    <circle cx="15.98" cy="12.92" r="1.38" className="fill-[#5865F2] group-hover:fill-[#4752C4] transition-colors duration-200" />
  </svg>
);

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<"All" | "Freelance" | "Frontend" | "Fullstack">("All");
  const [expandedCard, setExpandedCard] = useState<"quien-soy" | "estudios" | "foco" | Project | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isThemeChanging, setIsThemeChanging] = useState(false);

  // New interactive states
  const [selectedSkillName, setSelectedSkillName] = useState<string | null>(null);
  const [isSpecsModalOpen, setIsSpecsModalOpen] = useState(false);
  const [isReferencesModalOpen, setIsReferencesModalOpen] = useState(false);
  const [isDomainsModalOpen, setIsDomainsModalOpen] = useState(false);
  const [contactPrefill, setContactPrefill] = useState("");
  const [refIndex, setRefIndex] = useState(0);
  const [projectPage, setProjectPage] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const [avatarError, setAvatarError] = useState(false);

  const swipeContainerRef = React.useRef<HTMLDivElement | null>(null);
  const pageRefs = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const projTouchStartRef = React.useRef<number | null>(null);
  const currentDragOffsetRef = React.useRef<number>(0);

  useEffect(() => {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);
  }, []);

  // Reset projects page when category tab changes
  useEffect(() => {
    setProjectPage(0);
  }, [activeCategory]);

  const filteredProjects = useMemo(() => {
    return activeCategory === "All"
      ? PROJECTS
      : activeCategory === "Freelance"
        ? PROJECTS.filter(p => p.type === "Freelance")
        : PROJECTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const PROJECTS_PER_PAGE = 2;
  const pageCount = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  // High-performance direct-DOM touch swipe handlers for Projects
  const handleProjTouchStart = (e: React.TouchEvent) => {
    projTouchStartRef.current = e.targetTouches[0].clientX;
    currentDragOffsetRef.current = 0;
    
    if (swipeContainerRef.current) {
      swipeContainerRef.current.style.transition = "none";
    }
    pageRefs.current.forEach((el) => {
      if (el) el.style.transition = "none";
    });
  };

  const handleProjTouchMove = (e: React.TouchEvent) => {
    if (projTouchStartRef.current === null) return;
    const currentX = e.targetTouches[0].clientX;
    const diff = currentX - projTouchStartRef.current;
    
    // Apply elastic resistance past boundaries
    let finalDiff = diff;
    if (projectPage === 0 && diff > 0) {
      finalDiff = diff * 0.35;
    } else if (projectPage === pageCount - 1 && diff < 0) {
      finalDiff = diff * 0.35;
    }
    
    currentDragOffsetRef.current = finalDiff;

    // Mutate DOM transform directly for a locked 60 FPS gesture response
    if (swipeContainerRef.current) {
      swipeContainerRef.current.style.transform = `translateX(calc(-${projectPage * 100}% + ${finalDiff}px))`;
    }

    // Dynamic opacity/blur updates on DOM nodes bypass React's render loop
    const dragProgress = finalDiff / 350;
    const currentPagePosition = projectPage - dragProgress;
    
    pageRefs.current.forEach((el, idx) => {
      if (el) {
        const distance = Math.abs(idx - currentPagePosition);
        const opacity = Math.max(0, 1 - distance);
        const blurVal = Math.min(4, distance * 4);
        el.style.opacity = String(opacity);
        el.style.filter = `blur(${blurVal}px)`;
      }
    });
  };

  const handleProjTouchEnd = () => {
    if (projTouchStartRef.current === null) return;
    
    const threshold = 65;
    const finalOffset = currentDragOffsetRef.current;
    let targetPage = projectPage;

    if (finalOffset < -threshold && projectPage < pageCount - 1) {
      targetPage = projectPage + 1;
    } else if (finalOffset > threshold && projectPage > 0) {
      targetPage = projectPage - 1;
    }

    projTouchStartRef.current = null;
    currentDragOffsetRef.current = 0;

    // Snap cleanly and update React state to sync with the active page index
    setProjectPage(targetPage);
    
    if (swipeContainerRef.current) {
      swipeContainerRef.current.style.transition = "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)";
      swipeContainerRef.current.style.transform = `translateX(-${targetPage * 100}%)`;
    }
    
    pageRefs.current.forEach((el, idx) => {
      if (el) {
        el.style.transition = "opacity 0.3s ease-out, filter 0.3s ease-out";
        const distance = Math.abs(idx - targetPage);
        const opacity = Math.max(0, 1 - distance);
        const blurVal = Math.min(4, distance * 4);
        el.style.opacity = String(opacity);
        el.style.filter = `blur(${blurVal}px)`;
      }
    });
  };

  // Swipe handlers for References (Page-based sliding)
  const [refTouchStart, setRefTouchStart] = useState<number | null>(null);
  const [refTouchEnd, setRefTouchEnd] = useState<number | null>(null);

  const handleRefTouchStart = (e: React.TouchEvent) => {
    setRefTouchEnd(null);
    setRefTouchStart(e.targetTouches[0].clientX);
  };

  const handleRefTouchMove = (e: React.TouchEvent) => {
    setRefTouchEnd(e.targetTouches[0].clientX);
  };

  const handleRefTouchEnd = () => {
    if (!refTouchStart || !refTouchEnd) return;
    const distance = refTouchStart - refTouchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      setRefIndex(prev => (prev + 1) % REFERENCES_DB.length);
    } else if (isRightSwipe) {
      setRefIndex(prev => (prev - 1 + REFERENCES_DB.length) % REFERENCES_DB.length);
    }
  };

  const [stats, setStats] = useState<{ visits: number | null, likes: number | null, dislikes: number | null }>({
    visits: null,
    likes: null,
    dislikes: null
  });
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null);
  const [isMusicMuted, setIsMusicMuted] = useState(true);
  const [isSFXMuted, setIsSFXMuted] = useState(false);

  const [hasInteracted, setHasInteracted] = useState(false);

  const musicRef = useRef<HTMLAudioElement | null>(null);
  const clickRef = useRef<HTMLAudioElement | null>(null);
  const swipeRef = useRef<HTMLAudioElement | null>(null);
  const errorRef = useRef<HTMLAudioElement | null>(null);

  // Initialize native audio volume on mount
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = 0.08;
    }
  }, []);

  // Synchronize sound states and listen to first user gesture for bypass
  useEffect(() => {
    const handleGesture = () => {
      const audio = musicRef.current;
      if (audio && !hasInteracted) {
        audio.muted = false;
        audio.play()
          .then(() => {
            setHasInteracted(true);
            setIsMusicMuted(false);
            // Clean up event listeners after first trigger
            const events = ["click", "touchstart", "scroll", "mousemove", "keydown", "wheel", "mousedown", "pointerdown"];
            events.forEach(event => {
              window.removeEventListener(event, handleGesture);
            });
          })
          .catch(() => {
            // Re-mute if browser blocks autoplay
            audio.muted = true;
          });
      }
    };

    if (!hasInteracted) {
      const events = ["click", "touchstart", "scroll", "mousemove", "keydown", "wheel", "mousedown", "pointerdown"];
      events.forEach(event => {
        window.addEventListener(event, handleGesture, { passive: true });
      });
    }

    return () => {
      const events = ["click", "touchstart", "scroll", "mousemove", "keydown", "wheel", "mousedown", "pointerdown"];
      events.forEach(event => {
        window.removeEventListener(event, handleGesture);
      });
    };
  }, [hasInteracted]);

  // Listen to custom window events for click, swipe and error sound clip playbacks
  useEffect(() => {
    const handlePlayClick = () => {
      if (!isSFXMuted && clickRef.current) {
        clickRef.current.currentTime = 0;
        clickRef.current.play().catch(() => {});
      }
    };
    const handlePlaySwipe = () => {
      if (!isSFXMuted && swipeRef.current) {
        swipeRef.current.currentTime = 0;
        swipeRef.current.play().catch(() => {});
      }
    };
    const handlePlayError = () => {
      if (!isSFXMuted && errorRef.current) {
        errorRef.current.currentTime = 0;
        errorRef.current.play().catch(() => {});
      }
    };

    window.addEventListener("play-click", handlePlayClick);
    window.addEventListener("play-swipe", handlePlaySwipe);
    window.addEventListener("play-error", handlePlayError);

    return () => {
      window.removeEventListener("play-click", handlePlayClick);
      window.removeEventListener("play-swipe", handlePlaySwipe);
      window.removeEventListener("play-error", handlePlayError);
    };
  }, [isSFXMuted]);

  useEffect(() => {
    const hasVisited = localStorage.getItem("visited_jeremerc_v2");

    if (!hasVisited) {
      // Register unique visit (which also returns current stats)
      fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "visit" }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.visits !== undefined) {
            setStats({
              visits: data.visits,
              likes: data.likes,
              dislikes: data.dislikes,
            });
            localStorage.setItem("visited_jeremerc_v2", "true");
          }
        })
        .catch((err) => {
          console.error("Error recording visit:", err);
          // Fallback to GET if POST fails
          fetch("/api/stats")
            .then((res) => res.json())
            .then((data) => {
              if (data && data.visits !== undefined) {
                setStats({
                  visits: data.visits,
                  likes: data.likes,
                  dislikes: data.dislikes,
                });
              }
            })
            .catch((e) => console.error("Error fetching fallback stats:", e));
        });
    } else {
      // Just fetch current stats
      fetch("/api/stats")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.visits !== undefined) {
            setStats({
              visits: data.visits,
              likes: data.likes,
              dislikes: data.dislikes,
            });
          }
        })
        .catch((err) => console.error("Error fetching stats:", err));
    }

    // Read user vote
    const savedVote = localStorage.getItem("user_vote_feedback") as "like" | "dislike" | null;
    if (savedVote) {
      setUserVote(savedVote);
    }
  }, []);

  const handleVote = useCallback((voteType: "like" | "dislike") => {
    if (userVote) return;
    fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: voteType }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.likes !== undefined) {
          setStats({
            visits: data.visits,
            likes: data.likes,
            dislikes: data.dislikes,
          });
          setUserVote(voteType);
          localStorage.setItem("user_vote_feedback", voteType);
        }
      })
      .catch((err) => console.error("Error sending vote:", err));
  }, [userVote]);

  // References autoplay cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setRefIndex((prev) => (prev + 1) % REFERENCES_DB.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Central Scroll Lock manager and modal swipe sound triggers
  const isAnyModalOpen = !!selectedSkillName || !!expandedCard || isSpecsModalOpen || isReferencesModalOpen || isDomainsModalOpen;
  const wasAnyModalOpenRef = useRef(false);

  useEffect(() => {
    // Play swipe sound when a modal opens/closes
    if (isAnyModalOpen !== wasAnyModalOpenRef.current) {
      if (typeof window !== "undefined") {
        if (isAnyModalOpen) {
          // Delay to align sound with spring animations (stiffness: 220, damping: 25)
          const timer = setTimeout(() => {
            window.dispatchEvent(new CustomEvent("play-swipe"));
          }, 100);
          wasAnyModalOpenRef.current = isAnyModalOpen;
          return () => clearTimeout(timer);
        } else {
          window.dispatchEvent(new CustomEvent("play-swipe"));
        }
      }
    }
    wasAnyModalOpenRef.current = isAnyModalOpen;

    if (isAnyModalOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.scrollLockY = scrollY.toString();
    } else {
      const scrollYStr = document.body.dataset.scrollLockY;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollYStr) {
        const scrollY = parseInt(scrollYStr, 10);
        window.scrollTo(0, scrollY);
        delete document.body.dataset.scrollLockY;
      }
    }
    return () => {
      const scrollYStr = document.body.dataset.scrollLockY;
      if (scrollYStr) {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, parseInt(scrollYStr, 10));
        delete document.body.dataset.scrollLockY;
      }
    };
  }, [isAnyModalOpen]);

  // Initialize theme from system or storage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const activeTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : systemTheme;

    setTheme(activeTheme as "light" | "dark");
    if (activeTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Theme switch logic with brief card tilt/bump trigger
  const toggleTheme = () => {
    setIsThemeChanging(true);
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }

    setTimeout(() => {
      setIsThemeChanging(false);
    }, 400);
  };



  const renderSkillTags = useCallback((skills: string[], color: string) => {
    return skills.map((skill, idx) => (
      <button
        key={idx}
        onClick={() => setSelectedSkillName(skill)}
        className={`px-4 py-2 border-2 border-(--c-border) font-display font-bold uppercase text-xs tracking-wider shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] inline-block ${color} text-black cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-transform`}
      >
        {skill} <span className="font-mono text-[9px] font-black">+</span>
      </button>
    ));
  }, []);

  return (
    <main className="relative min-h-screen p-3 sm:p-4 md:p-8 flex items-center justify-center">
      <a href="#main-content" className="skip-to-content">
        Saltar al contenido principal
      </a>

      {/* Native HTML5 Audio nodes for script-blocker bypass */}
      <audio ref={musicRef} src="/sounds/ambient.mp3" loop muted autoPlay />
      <audio ref={clickRef} src="/sounds/click.wav" preload="auto" />
      <audio ref={swipeRef} src="/sounds/swipe.wav" preload="auto" />
      <audio ref={errorRef} src="/sounds/error.wav" preload="auto" />

      {/* Background ShapeGrid (High-Performance lightweight Canvas 2D) */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none" style={{ pointerEvents: 'none' }}>
        <ShapeGridBackground paused={isAnyModalOpen} />
      </div>

      {/* Grid Layout Container */}
      <div id="main-content" className="w-full max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6 relative z-10">
        <h1 className="sr-only">Jeremyah Mercado — Full Stack Developer, IA & Ciencia de Datos Freelance</h1>

        {/* Theme Switcher, Sound Controls and Header Widget */}
        <div className="flex justify-between items-center px-1 sm:px-2">
          <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs font-bold text-(--c-text-muted)">
            <Terminal size={14} /> status: 200
          </div>

            <div className="flex items-center gap-2">
            {/* Music Play/Pause Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const audio = musicRef.current;
                if (audio) {
                  if (isMusicMuted) {
                    audio.muted = false;
                    audio.play()
                      .then(() => {
                        setIsMusicMuted(false);
                        setHasInteracted(true);
                      })
                      .catch(() => {
                        audio.muted = true;
                      });
                  } else {
                    audio.pause();
                    audio.muted = true;
                    setIsMusicMuted(true);
                  }
                }
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("play-click"));
                }
              }}
              className="neo-btn bg-(--c-surface) w-[34px] h-[34px] cursor-pointer flex items-center justify-center animate-fadeIn"
              title={isMusicMuted ? "Activar música de fondo" : "Silenciar música de fondo"}
              aria-label={isMusicMuted ? "Activar música de fondo" : "Silenciar música de fondo"}
            >
              {isMusicMuted ? <Play className="stroke-[2.5] text-(--c-text-muted)" size={14} /> : <Pause className="stroke-[2.5] text-neo-pink fill-neo-pink/20" size={14} />}
            </button>

            {/* SFX Mute Button */}
            <button
              onClick={() => {
                const newState = !isSFXMuted;
                setIsSFXMuted(newState);
                if (!newState && typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("play-click"));
                }
              }}
              className="neo-btn bg-(--c-surface) w-[34px] h-[34px] cursor-pointer flex items-center justify-center"
              title={isSFXMuted ? "Activar efectos de sonido" : "Silenciar efectos de sonido"}
              aria-label={isSFXMuted ? "Activar efectos de sonido" : "Silenciar efectos de sonido"}
            >
              {isSFXMuted ? <VolumeX className="stroke-[2.5] text-(--c-text-muted)" size={14} /> : <Volume2 className="stroke-[2.5] text-neo-cyan" size={14} />}
            </button>

            {/* Theme Switcher Button */}
            <button
              onClick={() => {
                toggleTheme();
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("play-click"));
                }
              }}
              className="neo-btn bg-(--c-surface) w-[128px] h-[34px] text-xs font-bold uppercase flex items-center justify-center gap-1.5 cursor-pointer"
              aria-label={theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
            >
              {theme === "light" ? (
                <>
                  Modo Oscuro <Moon size={14} className="stroke-[2.5]" />
                </>
              ) : (
                <>
                  Modo Claro <Sun size={14} className="stroke-[2.5]" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <LayoutGroup id="bento-grid">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 auto-rows-[minmax(160px,auto)] sm:auto-rows-[minmax(180px,auto)]"
          >

          {/* ═══ CELL 1: Interactive Profile Card (Who I Am) ═══ */}
          <motion.div
            layout
            className={`sm:col-span-2 md:col-span-2 md:row-span-2 ${isThemeChanging ? "theme-bump" : ""}`}
          >
            <DecayCard maxTilt={10} className="w-full h-full">
              <div className="flex flex-col justify-between h-full min-h-[320px] sm:min-h-[380px]">

                {/* Header Profile Info */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    {/* Profile Picture with graceful CSS Art fallback */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 border-4 border-(--c-border) bg-neo-yellow overflow-hidden shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] shrink-0">
                      {!avatarError ? (
                        <img 
                          src="/avatar.png" 
                          alt="Jeremyah Mercado" 
                          className="w-full h-full object-cover" 
                          onError={() => setAvatarError(true)}
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-[radial-gradient(#000_20%,transparent_20%)] bg-size-[8px_8px] opacity-20" />
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-t-full bg-black border-2 border-black" />
                          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 border-black flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-(--c-text) leading-none block">
                        Jeremyah
                      </span>
                      <span className="font-mono text-[10px] sm:text-xs font-bold text-(--c-text-muted) mt-1">
                        @WriteColor
                      </span>
                      <div className="flex flex-wrap gap-2 items-center mt-2.5">
                        <button
                          onClick={() => {
                            setIsSpecsModalOpen(true);
                            if (typeof window !== "undefined") {
                              window.dispatchEvent(new CustomEvent("play-click"));
                            }
                          }}
                          className="font-mono text-xs font-bold text-neo-cyan cursor-pointer flex items-center gap-1.5 border-2 border-(--c-border) px-2.5 py-1 bg-(--c-surface) shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] hover:-translate-y-0.5 active:translate-y-0 transition-transform shrink-0 whitespace-nowrap"
                        >
                          <Laptop size={13} /> Specs +
                        </button>
                        <button
                          onClick={() => {
                            setIsDomainsModalOpen(true);
                            if (typeof window !== "undefined") {
                              window.dispatchEvent(new CustomEvent("play-click"));
                            }
                          }}
                          className="font-mono text-xs font-bold text-neo-yellow cursor-pointer flex items-center gap-1.5 border-2 border-(--c-border) px-2.5 py-1 bg-(--c-surface) shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] hover:-translate-y-0.5 active:translate-y-0 transition-transform shrink-0 whitespace-nowrap"
                        >
                          <Globe size={13} /> Dominios +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Pulsing Status Beacon - Redesigned to be premium neobrutalist */}
                  <span className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 border-2 border-black bg-neo-green font-display font-black uppercase text-[8px] sm:text-[10px] tracking-wider text-black shadow-[2px_2px_0px_0px_#000] shrink-0 select-none">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-45"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                    </span>
                    Disponible
                  </span>
                </div>

                {/* Interactive Terminal Console */}
                <div className="my-3 sm:my-5">
                  <InteractiveTerminal
                    onScrollToProjects={() => document.getElementById("proyectos-showcase")?.scrollIntoView({ behavior: "smooth" })}
                    onOpenContact={() => {
                      setShowContactForm(true);
                      setTimeout(() => document.getElementById("contacto-showcase")?.scrollIntoView({ behavior: "smooth" }), 200);
                    }}
                    onOpenSpecs={() => setIsSpecsModalOpen(true)}
                    onOpenReferences={() => setIsReferencesModalOpen(true)}
                    onToggleTheme={toggleTheme}
                    onOpenSkill={(skillName) => setSelectedSkillName(skillName)}
                    onOpenDomains={() => setIsDomainsModalOpen(true)}
                  />
                </div>

                {/* Profile statistics widgets */}
                <div className="grid grid-cols-2 gap-2 border-t-4 border-dashed border-(--c-border)/20 pt-3 sm:pt-4 mb-2 sm:mb-3">
                  <div className="flex flex-col">
                    <span className="font-display font-black text-xl sm:text-2xl text-neo-pink leading-none">98%</span>
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase font-bold text-(--c-text-muted)">Score de Optimización</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display font-black text-xl sm:text-2xl text-neo-cyan leading-none">100%</span>
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase font-bold text-(--c-text-muted)">Calidad de Código</span>
                  </div>
                </div>

                {/* Footer Bio summary */}
                <div>
                  <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tighter leading-none mb-1 text-(--c-text)">
                    Full Stack Developer
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-(--c-text-muted) font-medium">
                    Desarrollador web, asistentes de IA y arquitectura de software escalable.
                  </p>
                </div>
              </div>
            </DecayCard>
          </motion.div>

          {/* ═══ CELL 2: Biography & Studies (CardSwap) ═══ */}
          <motion.div
            layout
            className={`sm:col-span-2 md:col-span-2 md:row-span-1 ${isThemeChanging ? "theme-bump" : ""}`}
          >
            <CardSwap
              className="w-full h-full min-h-[180px]"
              front={
                <div className="neo-card p-4 sm:p-6 h-full flex flex-col justify-between hover:bg-(--c-surface-hover) transition-colors relative">
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-display font-black text-[10px] sm:text-xs uppercase bg-(--c-text) text-(--c-bg) px-2 py-1">
                      Quién Soy
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedCard("quien-soy");
                        if (typeof window !== "undefined") {
                          window.dispatchEvent(new CustomEvent("play-click"));
                        }
                      }}
                      className="font-mono text-xs sm:text-[13px] font-black uppercase text-neo-pink border-2 border-(--c-border) px-3 py-1 shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] bg-(--c-surface) cursor-pointer shrink-0"
                    >
                      Expandir +
                    </button>
                  </div>
                  <p className="font-sans text-xs sm:text-sm font-semibold text-(--c-text) my-3 leading-snug">
                    Soy un desarrollador de software Full Stack apasionado por crear aplicaciones web modernas, robustas, escalables y visualmente atractivas.
                  </p>
                  <div className="font-display font-bold text-xs uppercase flex justify-between items-center text-(--c-text)">
                    <div className="flex gap-3 sm:gap-4">
                      <span>📍 Remoto</span>
                      <span>⚡ Rápido</span>
                    </div>
                    <span className="font-mono text-[9px] text-(--c-text-subtle) flex items-center gap-1">
                      Click para voltear <ChevronRight size={10} />
                    </span>
                  </div>
                </div>
              }
              back={
                <div className="neo-card-themed bg-neo-yellow text-black p-4 sm:p-6 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-display font-black text-[10px] sm:text-xs uppercase bg-black text-white px-2 py-1">
                      Estudios & Foco
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedCard("estudios");
                          if (typeof window !== "undefined") {
                            window.dispatchEvent(new CustomEvent("play-click"));
                          }
                        }}
                        className="font-mono text-xs font-black uppercase text-black border-2 border-black px-2.5 py-1 shadow-[2px_2px_0px_0px_#000] bg-white cursor-pointer"
                      >
                        Estudios +
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedCard("foco");
                          if (typeof window !== "undefined") {
                            window.dispatchEvent(new CustomEvent("play-click"));
                          }
                        }}
                        className="font-mono text-xs font-black uppercase text-black border-2 border-black px-2.5 py-1 shadow-[2px_2px_0px_0px_#000] bg-white cursor-pointer"
                      >
                        Foco +
                      </button>
                    </div>
                  </div>
                  <div className="my-2">
                    <p className="font-sans text-xs sm:text-sm font-bold text-black leading-snug">
                      Estudiante de Ingeniería en Ciencia de Datos & IA, y desarrollador Full Stack especializado en Next.js, Node.js y ecosistemas de IA.
                    </p>
                  </div>
                  <div className="flex justify-between uppercase items-center">
                    <span className="font-mono text-[10px] font-black text-black">
                      📖 Aprendizaje Activo
                    </span>
                    <span className="font-mono text-[9px] text-black/60 flex items-center gap-1">
                      Click para volver <ChevronRight size={10} />
                    </span>
                  </div>
                </div>
              }
            />
          </motion.div>

          {/* ═══ CELL 3: Discord Button ═══ */}
          <motion.div
            layout
            className={`${isThemeChanging ? "theme-bump" : ""}`}
          >
            <a
              href="https://discord.com/users/668521031731773460"
              target="_blank"
              rel="noopener noreferrer"
              className="block group h-full"
            >
              <div className="neo-card-brand bg-[#5865F2] hover:bg-[#4752C4] text-white p-4 sm:p-6 h-full flex flex-col justify-between transition-colors min-h-[140px] sm:min-h-[180px]">
                <div className="flex justify-between items-start">
                  <DiscordIcon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                  <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg sm:text-xl uppercase leading-none">
                    Discord
                  </h3>
                  <p className="font-mono text-[9px] sm:text-[10px] uppercase font-bold text-white/80 mt-1">
                    @WriteColor
                  </p>
                </div>
              </div>
            </a>
          </motion.div>

          {/* ═══ CELL 4: GitHub Button ═══ */}
          <motion.div
            layout
            className={`${isThemeChanging ? "theme-bump" : ""}`}
          >
            <a
              href="https://github.com/WriteColor"
              target="_blank"
              rel="noopener noreferrer"
              className="block group h-full"
            >
              <div className="neo-card-brand bg-black text-white hover:bg-neutral-900 p-4 sm:p-6 h-full flex flex-col justify-between transition-colors min-h-[140px] sm:min-h-[180px]">
                <div className="flex justify-between items-start">
                  <GithubIcon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                  <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg sm:text-xl uppercase leading-none">
                    GitHub
                  </h3>
                  <p className="font-mono text-[9px] sm:text-[10px] uppercase font-bold text-white/80 mt-1">
                    @WriteColor
                  </p>
                </div>
              </div>
            </a>
          </motion.div>

          {/* ═══ CELL 5: Skills (Marquees) ═══ */}
          <motion.div
            layout
            className={`sm:col-span-2 ${isThemeChanging ? "theme-bump" : ""}`}
          >
            <div className="neo-card p-4 sm:p-6 h-full flex flex-col justify-between overflow-hidden min-h-[160px] sm:min-h-[180px]">
              <div className="flex justify-between items-center self-stretch">
                <span className="font-display font-black text-[10px] sm:text-xs uppercase bg-(--c-text) text-(--c-bg) px-2 py-1">
                  Skills & Stacks
                </span>
                <button
                  onClick={() => {
                    setSelectedSkillName("all");
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("play-click"));
                    }
                  }}
                  className="font-mono text-[11px] sm:text-xs font-black uppercase text-neo-pink border-2 border-(--c-border) px-2.5 py-1 bg-(--c-surface) shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
                >
                  Pulse para detalle +
                </button>
              </div>

              <div className="my-3 flex flex-col gap-2">
                <LogoLoop items={renderSkillTags(SKILLS_FRONT, "bg-neo-cyan")} speed="medium" direction="left" />
                <LogoLoop items={renderSkillTags(SKILLS_BACK, "bg-neo-pink")} speed="medium" direction="right" />
              </div>

              <div className="font-mono text-[9px] sm:text-[10px] font-bold text-(--c-text-muted) uppercase">
                Interacciones fluidas & API Robustas
              </div>
            </div>
          </motion.div>

          {/* ═══ CELL 6: Collaboration Terms / Contact Form ═══ */}
          <motion.div
            layout
            id="contacto-showcase"
            className={`sm:col-span-2 ${isThemeChanging ? "theme-bump" : ""}`}
          >
            <PixelCard pixelColor="#FF4E88" className="h-full">
              <div className="p-4 sm:p-6 h-full flex flex-col justify-between min-h-[160px]">
                <div className="flex justify-between items-center mb-1 gap-2">
                  <span className="font-display font-black text-[10px] sm:text-xs uppercase bg-(--c-text) text-(--c-bg) px-2 py-1">
                    Colaborar Conmigo
                  </span>
                  <button
                    onClick={() => {
                      setShowContactForm(!showContactForm);
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(new CustomEvent("play-click"));
                      }
                    }}
                    className="font-mono text-xs sm:text-[13px] font-black uppercase text-neo-pink border-2 border-(--c-border) px-3 py-1 shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] bg-(--c-surface) cursor-pointer shrink-0"
                  >
                    {showContactForm ? "Ver Info" : "Escríbeme +"}
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {showContactForm ? (
                    <motion.div
                      key="contact-form-key"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="my-2 text-left w-full"
                    >
                      <ContactForm
                        onClose={() => {
                          setShowContactForm(false);
                          setContactPrefill("");
                        }}
                        initialMessage={contactPrefill}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="contact-info-key"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="w-full flex flex-col justify-between grow"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-3">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1 text-neo-pink">
                            <Clock size={16} className="stroke-3" />
                            <span className="font-display font-black text-xs uppercase text-(--c-text)">Tiempos</span>
                          </div>
                          <span className="font-mono text-[10px] font-bold text-(--c-text-muted)">Flexibles & veloces</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1 text-neo-yellow">
                            <CircleDollarSign size={16} className="stroke-3" />
                            <span className="font-display font-black text-xs uppercase text-(--c-text)">Presupuesto</span>
                          </div>
                          <span className="font-mono text-[10px] font-bold text-(--c-text-muted)">Adaptable al producto</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1 text-neo-cyan">
                            <CheckCircle2 size={16} className="stroke-3" />
                            <span className="font-display font-black text-xs uppercase text-(--c-text)">Entrega</span>
                          </div>
                          <span className="font-mono text-[10px] font-bold text-(--c-text-muted)">Calidad garantizada</span>
                        </div>
                      </div>

                      <div className="font-sans text-[10px] sm:text-[11px] font-bold text-(--c-text) leading-tight">
                        Listo para desarrollar soluciones a medida. Sin rodeos comerciales agresivos, solo ingeniería sólida.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </PixelCard>
          </motion.div>

          {/* ═══ CELL 7: Projects Showcase ═══ */}
          <motion.div
            layout
            id="proyectos-showcase"
            className={`sm:col-span-2 md:col-span-3 md:row-span-2 ${isThemeChanging ? "theme-bump" : ""}`}
          >
            <div className="neo-card p-4 sm:p-6 h-full flex flex-col justify-between">

              {/* Header with Custom Category Filter buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <span className="font-display font-black text-[10px] sm:text-xs uppercase bg-(--c-text) text-(--c-bg) px-2 py-1">
                  Proyectos Freelance & Propios
                </span>

                {/* Filter tabs */}
                <div className="flex flex-wrap gap-1.5">
                  {(["All", "Freelance", "Frontend", "Fullstack"] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        if (typeof window !== "undefined") {
                          window.dispatchEvent(new CustomEvent("play-click"));
                        }
                      }}
                      className={`px-2.5 sm:px-3 py-1 border-2 border-(--c-border) font-display font-bold text-[10px] sm:text-xs uppercase transition-all duration-150 cursor-pointer ${activeCategory === cat
                        ? "bg-(--c-text) text-(--c-bg) translate-x-px translate-y-px shadow-[1px_1px_0px_0px_rgba(var(--c-shadow),1)]"
                        : "bg-(--c-surface) text-(--c-text) shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] hover:translate-x-px hover:translate-y-px active:translate-x-px active:translate-y-px"
                        }`}
                    >
                      {cat === "All" ? "Todos" : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Projects Grid List - Paginated with Mobile Swipe Support */}
              <div
                onTouchStart={isTouchDevice ? handleProjTouchStart : undefined}
                onTouchMove={isTouchDevice ? handleProjTouchMove : undefined}
                onTouchEnd={isTouchDevice ? handleProjTouchEnd : undefined}
                className="w-full my-2 touch-pan-y overflow-hidden relative"
              >
                {pageCount > 0 ? (
                  !isTouchDevice ? (
                    /* Desktop View: Render current page static grid only, no horizontal wrapper, no sliding */
                    <div className="grid grid-cols-1 gap-3 sm:gap-4 w-full">
                      {filteredProjects
                        .slice(
                          projectPage * PROJECTS_PER_PAGE,
                          (projectPage + 1) * PROJECTS_PER_PAGE
                        )
                        .map((project) => (
                          <button
                            key={project.id}
                            onClick={() => setExpandedCard(project)}
                            className="neo-card hover:bg-(--c-surface-hover) p-3 sm:p-4 flex flex-col justify-between h-auto min-h-[120px] sm:min-h-[130px] relative group overflow-hidden cursor-pointer text-left w-full"
                          >
                            <div className="absolute top-0 right-0 h-5 sm:h-6 px-2.5 border-b-2 border-l-2 border-(--c-border) font-display font-bold text-[8px] sm:text-[9px] uppercase bg-(--c-surface) text-(--c-text) flex items-center justify-center shadow-[-2px_2px_0px_0px_rgba(var(--c-shadow),1)]">
                              {project.type}
                            </div>

                            <div>
                              <div className="flex flex-wrap gap-1.5 items-center">
                                <span className={`px-2 py-0.5 border-2 border-(--c-border) font-display font-black text-[8px] sm:text-[9px] uppercase tracking-wider ${project.color} text-black shadow-[1px_1px_0px_0px_#000]`}>
                                  {project.stat}
                                </span>
                                <span className={`px-2 py-0.5 border-2 border-black font-display font-black text-[8px] sm:text-[9px] uppercase tracking-wider ${getProjectStatusColor(project.status)} shadow-[1px_1px_0px_0px_#000]`}>
                                  {project.status}
                                </span>
                              </div>
                              <h4 className="font-display font-black text-base sm:text-lg uppercase tracking-tight mt-2 leading-none text-(--c-text)">
                                {project.title}
                              </h4>
                              <p className="font-sans text-[10px] sm:text-xs font-semibold text-(--c-text-muted) mt-1 line-clamp-2">
                                {project.shortDesc}
                              </p>
                            </div>

                            <div className="flex justify-between items-center mt-3 pt-2 border-t border-(--c-border)/10">
                              <div className="flex gap-2 items-center">
                                <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase text-(--c-text)">
                                  {project.metric}
                                </span>
                                <span className="px-1.5 py-0.5 border border-(--c-border) font-display font-black text-[7px] sm:text-[8px] uppercase bg-(--c-surface-hover) text-(--c-text-muted)">
                                  {project.category}
                                </span>
                              </div>
                              <span className="font-display font-bold text-[10px] sm:text-xs uppercase text-(--c-text) flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                Ver Más <ArrowRight size={12} />
                              </span>
                            </div>
                          </button>
                        ))}
                    </div>
                  ) : (
                    /* Mobile View: Render swipeable container with horizontal layout */
                    <div
                      ref={swipeContainerRef}
                      className="flex w-full will-change-transform"
                      style={{
                        transform: `translateX(-${projectPage * 100}%)`,
                        transition: "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
                      }}
                    >
                      {Array.from({ length: pageCount }).map((_, pageIdx) => {
                        const pageProjects = filteredProjects.slice(
                          pageIdx * PROJECTS_PER_PAGE,
                          (pageIdx + 1) * PROJECTS_PER_PAGE
                        );
                        const distance = Math.abs(pageIdx - projectPage);
                        const opacity = Math.max(0, 1 - distance);
                        const blurVal = Math.min(4, distance * 4);

                        return (
                          <div
                            key={pageIdx}
                            ref={(el) => {
                              if (el) {
                                pageRefs.current.set(pageIdx, el);
                              } else {
                                pageRefs.current.delete(pageIdx);
                              }
                            }}
                            className="w-full shrink-0 px-1 will-change-[opacity,filter]"
                            style={{
                              opacity,
                              filter: `blur(${blurVal}px)`,
                              transition: "opacity 0.3s ease-out, filter 0.3s ease-out",
                            }}
                          >
                            <div className="grid grid-cols-1 gap-3 sm:gap-4 w-full">
                              {pageProjects.map((project) => (
                                <button
                                  key={project.id}
                                  onClick={() => {
                                    setExpandedCard(project);
                                    if (typeof window !== "undefined") {
                                      window.dispatchEvent(new CustomEvent("play-click"));
                                    }
                                  }}
                                  className="neo-card hover:bg-(--c-surface-hover) p-3 sm:p-4 flex flex-col justify-between h-auto min-h-[120px] sm:min-h-[130px] relative group overflow-hidden cursor-pointer text-left w-full"
                                >
                                  <div className="absolute top-0 right-0 h-5 sm:h-6 px-2.5 border-b-2 border-l-2 border-(--c-border) font-display font-bold text-[8px] sm:text-[9px] uppercase bg-(--c-surface) text-(--c-text) flex items-center justify-center shadow-[-2px_2px_0px_0px_rgba(var(--c-shadow),1)]">
                                    {project.type}
                                  </div>

                                  <div>
                                    <div className="flex flex-wrap gap-1.5 items-center">
                                      <span className={`px-2 py-0.5 border-2 border-(--c-border) font-display font-black text-[8px] sm:text-[9px] uppercase tracking-wider ${project.color} text-black shadow-[1px_1px_0px_0px_#000]`}>
                                        {project.stat}
                                      </span>
                                      <span className={`px-2 py-0.5 border-2 border-black font-display font-black text-[8px] sm:text-[9px] uppercase tracking-wider ${getProjectStatusColor(project.status)} shadow-[1px_1px_0px_0px_#000]`}>
                                        {project.status}
                                      </span>
                                    </div>
                                    <h4 className="font-display font-black text-base sm:text-lg uppercase tracking-tight mt-2 leading-none text-(--c-text)">
                                      {project.title}
                                    </h4>
                                    <p className="font-sans text-[10px] sm:text-xs font-semibold text-(--c-text-muted) mt-1 line-clamp-2">
                                      {project.shortDesc}
                                    </p>
                                  </div>

                                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-(--c-border)/10">
                                    <div className="flex gap-2 items-center">
                                      <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase text-(--c-text)">
                                        {project.metric}
                                      </span>
                                      <span className="px-1.5 py-0.5 border border-(--c-border) font-display font-black text-[7px] sm:text-[8px] uppercase bg-(--c-surface-hover) text-(--c-text-muted)">
                                        {project.category}
                                      </span>
                                    </div>
                                    <span className="font-display font-bold text-[10px] sm:text-xs uppercase text-(--c-text) flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                      Ver Más <ArrowRight size={12} />
                                    </span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )
                ) : (
                  <div className="text-center font-mono text-xs text-(--c-text-muted) py-8 border-2 border-dashed border-(--c-border)/20">
                    No se encontraron proyectos para esta categoría
                  </div>
                )}
                {isTouchDevice && (
                  <div className="block sm:hidden font-mono text-[7px] text-(--c-text-subtle) uppercase text-center mt-2.5 animate-pulse select-none">
                    ← Desliza hacia los lados para cambiar de página →
                  </div>
                )}
              </div>

              {/* Status and Pagination footer inside projects */}
              <div className="border-t-2 border-(--c-border) pt-3 mt-4 grid grid-cols-3 items-center text-(--c-text-muted) font-mono text-[9px] sm:text-[10px] font-bold uppercase select-none w-full">
                <div className="text-left truncate">
                  Total: {filteredProjects.length} {filteredProjects.length === 1 ? "proyecto" : "proyectos"}
                </div>
                
                <div className="flex justify-center w-full">
                  {pageCount > 1 && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setProjectPage(prev => Math.max(0, prev - 1));
                          if (typeof window !== "undefined") {
                            window.dispatchEvent(new CustomEvent("play-click"));
                          }
                        }}
                        disabled={projectPage === 0}
                        className="p-1.5 sm:p-2 border-2 border-(--c-border) bg-(--c-surface) text-(--c-text) shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0px_0px_rgba(var(--c-shadow),1)] active:translate-x-px active:translate-y-px active:shadow-none disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-100 flex items-center justify-center cursor-pointer"
                        title="Página Anterior"
                      >
                        <ChevronLeft size={12} className="stroke-3" />
                      </button>
                      <span className="text-[9px] sm:text-xs font-black min-w-[55px] sm:min-w-[65px] text-center">
                        Pág {projectPage + 1} / {pageCount}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setProjectPage(prev => Math.min(pageCount - 1, prev + 1));
                          if (typeof window !== "undefined") {
                            window.dispatchEvent(new CustomEvent("play-click"));
                          }
                        }}
                        disabled={projectPage === pageCount - 1}
                        className="p-1.5 sm:p-2 border-2 border-(--c-border) bg-(--c-surface) text-(--c-text) shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0px_0px_rgba(var(--c-shadow),1)] active:translate-x-px active:translate-y-px active:shadow-none disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-100 flex items-center justify-center cursor-pointer"
                        title="Siguiente Página"
                      >
                        <ChevronRight size={12} className="stroke-3" />
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="text-right text-[7px] sm:text-[9px] text-(--c-text-subtle) truncate">
                  JEREMERC.DEV
                </div>
              </div>

            </div>
          </motion.div>

          {/* ═══ CELL 8: Instagram Button ═══ */}
          <motion.div
            layout
            className={`${isThemeChanging ? "theme-bump" : ""}`}
          >
            <a
              href="https://www.instagram.com/m.jere_echev/"
              target="_blank"
              rel="noopener noreferrer"
              className="block group h-full"
            >
              <div className="neo-card-brand bg-[#E1306C] hover:bg-[#C13584] text-white p-4 sm:p-6 h-full flex flex-col justify-between transition-colors min-h-[160px] sm:min-h-[195px] md:min-h-[200px]">
                <div className="flex justify-between items-start">
                  <InstagramIcon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                  <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg sm:text-xl uppercase leading-none text-white">
                    Instagram
                  </h3>
                  <p className="font-mono text-[9px] sm:text-[10px] uppercase font-bold text-white/80 mt-1">
                    @m.jere_echev
                  </p>
                </div>
              </div>
            </a>
          </motion.div>

          {/* ═══ CELL 9: Testimonials / References (CardSwap) ═══ */}
          <motion.div
            layout
            className={`${isThemeChanging ? "theme-bump" : ""}`}
          >
            <CardSwap
              className="w-full h-full min-h-[185px] sm:min-h-[195px] md:min-h-[200px]"
              front={
                <div className="neo-card p-4 sm:p-6 h-full flex flex-col justify-between items-center text-center hover:bg-(--c-surface-hover)">
                  <div className="border-4 border-(--c-border) bg-neo-yellow p-3 shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)]">
                    <Lock size={24} className="stroke-[2.5] text-black sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-xs sm:text-sm uppercase leading-none mt-2 text-(--c-text)">
                      Referencias
                    </h3>
                    <p className="font-mono text-[8px] sm:text-[9px] uppercase font-bold text-(--c-text-muted) mt-1">
                      Haz click para desbloquear +
                    </p>
                  </div>
                </div>
              }
              back={
                <div
                  onTouchStart={handleRefTouchStart}
                  onTouchMove={handleRefTouchMove}
                  onTouchEnd={handleRefTouchEnd}
                  className="neo-card p-3 sm:p-4 h-full flex flex-col justify-between overflow-hidden relative group/carousel touch-pan-y"
                >
                  <div className="flex flex-col h-full gap-1.5 overflow-hidden">

                    {/* Top Row: Info Tag & Action Button */}
                    <div className="flex items-center justify-between gap-1.5 shrink-0">
                      <span className="font-display font-black text-[8px] sm:text-[9px] uppercase bg-neo-cyan text-black px-1.5 py-0.5 shadow-[1px_1px_0px_0px_rgba(var(--c-shadow),1)] border border-(--c-border) select-none">
                        Opinión {refIndex + 1}/{REFERENCES_DB.length}
                      </span>
                      <div className="flex gap-1 items-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsReferencesModalOpen(true);
                            if (typeof window !== "undefined") {
                              window.dispatchEvent(new CustomEvent("play-click"));
                            }
                          }}
                          className="font-mono text-[11px] sm:text-xs font-black text-neo-pink uppercase cursor-pointer border-2 border-(--c-border) px-2.5 py-1 bg-(--c-surface) shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] shrink-0 hover:bg-(--c-surface-hover)"
                        >
                          Ver Todas +
                        </button>
                        <Unlock size={10} className="text-neo-pink animate-pulse shrink-0" />
                      </div>
                    </div>

                    {/* Content Area - Scrollable when height is compressed */}
                    <div className="grow overflow-y-auto flex flex-col justify-center min-h-[30px] pr-0.5 scrollbar-thin select-none">
                      <p className="font-sans text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-(--c-text) italic leading-tight">
                        &quot;{REFERENCES_DB[refIndex].text}&quot;
                      </p>
                      <span className="font-mono text-[7px] sm:text-[8px] md:text-[9px] font-black uppercase text-(--c-text-muted) block mt-1 text-right">
                        — {REFERENCES_DB[refIndex].author} ({REFERENCES_DB[refIndex].role})
                      </span>
                    </div>

                    {/* Manual Carousel Controls */}
                    <div className="flex justify-between items-center border-t border-(--c-border)/10 pt-2">
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setRefIndex((prev) => (prev - 1 + REFERENCES_DB.length) % REFERENCES_DB.length);
                            if (typeof window !== "undefined") {
                              window.dispatchEvent(new CustomEvent("play-click"));
                            }
                          }}
                          className="p-2 border-2 border-(--c-border) bg-(--c-surface) text-(--c-text) shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_0px_rgba(var(--c-shadow),1)] active:translate-x-px active:translate-y-px active:shadow-none transition-all duration-100 flex items-center justify-center cursor-pointer"
                          title="Opinión Anterior"
                        >
                          <ChevronLeft size={14} className="stroke-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setRefIndex((prev) => (prev + 1) % REFERENCES_DB.length);
                            if (typeof window !== "undefined") {
                              window.dispatchEvent(new CustomEvent("play-click"));
                            }
                          }}
                          className="p-2 border-2 border-(--c-border) bg-(--c-surface) text-(--c-text) shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_0px_rgba(var(--c-shadow),1)] active:translate-x-px active:translate-y-px active:shadow-none transition-all duration-100 flex items-center justify-center cursor-pointer"
                          title="Siguiente Opinión"
                        >
                          <ChevronRight size={14} className="stroke-3" />
                        </button>
                      </div>
                      <span className="font-mono text-[7px] sm:text-[8px] uppercase text-(--c-text-subtle) select-none">
                        Cierra clickeando de nuevo
                      </span>
                    </div>
                  </div>
                </div>
              }
            />
          </motion.div>

          {/* ═══ CELL 10: Domain Search Bento Grid Section ═══ */}
          <DomainSearchBento />

        </motion.div>
      </LayoutGroup>

        {/* Footer Accent Decoration & Stats Metric Tracker */}
        <div className="neo-card p-4 md:p-5 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-5 text-center md:text-left bg-(--c-surface)">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full md:w-auto">
            {/* Visitors metric badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-(--c-border) bg-(--c-surface-hover) shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] font-mono text-[10px] sm:text-xs font-bold text-(--c-text)">
              <Eye size={12} className="text-neo-cyan animate-pulse" />
              <span>
                Visitas únicas:{" "}
                <span className="font-black text-neo-cyan">
                  {stats.visits !== null ? (
                    <CountUp to={stats.visits} separator="," />
                  ) : (
                    "-"
                  )}
                </span>
              </span>
            </div>

            {/* Voting Component */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] sm:text-xs text-(--c-text-muted) uppercase font-bold">¿Te gusta el portfolio?</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleVote("like")}
                  disabled={!!userVote}
                  className={`p-1.5 border-2 transition-transform flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase cursor-pointer ${userVote === "like"
                    ? "bg-emerald-500 text-black border-black translate-x-px translate-y-px shadow-none"
                    : userVote
                      ? "opacity-30 grayscale cursor-not-allowed border-zinc-300 dark:border-zinc-700"
                      : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 dark:border-emerald-500/50 shadow-[2px_2px_0px_0px_rgba(16,185,129,0.2)] hover:-translate-y-0.5 active:translate-y-0"
                    }`}
                  title={userVote ? "Ya has calificado" : "Me gusta"}
                >
                  <ThumbsUp size={12} className={userVote === "like" ? "fill-black" : ""} />
                  <span>
                    {stats.likes !== null ? (
                      <CountUp to={stats.likes} separator="," />
                    ) : (
                      "-"
                    )}
                  </span>
                </button>

                <button
                  onClick={() => handleVote("dislike")}
                  disabled={!!userVote}
                  className={`p-1.5 border-2 transition-transform flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase cursor-pointer ${userVote === "dislike"
                    ? "bg-rose-500 text-black border-black translate-x-px translate-y-px shadow-none"
                    : userVote
                      ? "opacity-30 grayscale cursor-not-allowed border-zinc-300 dark:border-zinc-700"
                      : "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 dark:border-rose-500/50 shadow-[2px_2px_0px_0px_rgba(244,63,94,0.2)] hover:-translate-y-0.5 active:translate-y-0"
                    }`}
                  title={userVote ? "Ya has calificado" : "No me gusta"}
                >
                  <ThumbsDown size={12} className={userVote === "dislike" ? "fill-black" : ""} />
                  <span>
                    {stats.dislikes !== null ? (
                      <CountUp to={stats.dislikes} separator="," />
                    ) : (
                      "-"
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1 font-mono text-[9px] sm:text-xs text-(--c-text-muted) w-full md:w-auto">
            <span>© 2026 Jeremyah (WriteColor). Construido bajo la filosofía Neobrutalist + BaseUI.</span>
            {/*<span className="text-[8px] opacity-75">Datos persistidos en Vercel Serverless Edge</span>*/}
          </div>
        </div>

      </div>

      {/* ═══ MODAL OVERLAYS ═══ */}
      <BioProjectDetailModal
        expandedCard={expandedCard}
        onClose={() => setExpandedCard(null)}
      />

      {/* ═══ INTERACTIVE DIALOG MODALS ═══ */}
      <Suspense fallback={null}>
        <SpecsModal
          isOpen={isSpecsModalOpen}
          onClose={() => setIsSpecsModalOpen(false)}
        />

        <ReferencesModal
          isOpen={isReferencesModalOpen}
          onClose={() => setIsReferencesModalOpen(false)}
        />

        <DomainsModal
          isOpen={isDomainsModalOpen}
          onClose={() => setIsDomainsModalOpen(false)}
          onOpenContactWithPrefill={(msg) => {
            setContactPrefill(msg);
            setIsDomainsModalOpen(false);
            setShowContactForm(true);
            setTimeout(() => document.getElementById("contacto-showcase")?.scrollIntoView({ behavior: "smooth" }), 200);
          }}
        />

        <SkillDetailModal
          skillName={selectedSkillName}
          onClose={() => setSelectedSkillName(null)}
          onOpenProject={(projectTitle) => {
            const project = PROJECTS.find(p => p.title.toLowerCase() === projectTitle.toLowerCase());
            if (project) {
              setExpandedCard(project);
              setSelectedSkillName(null);
            }
          }}
        />
      </Suspense>
    </main>
  );
}
