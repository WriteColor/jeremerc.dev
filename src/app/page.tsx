"use client";

import React, { useState, useEffect } from "react";
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
  Eye
} from "lucide-react";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
// import FerrofluidBackground from "@/components/backgrounds/FerrofluidBackground";
import ShapeGridBackground from "@/components/backgrounds/ShapeGridBackground";
import PixelCard from "@/components/ui/PixelCard";
import DecayCard from "@/components/ui/DecayCard";
import CardSwap from "@/components/ui/CardSwap";
import LogoLoop from "@/components/ui/LogoLoop";
import ContactForm from "@/components/forms/ContactForm";
import InteractiveTerminal from "@/components/terminal/InteractiveTerminal";
import SpecsModal from "@/components/modals/SpecsModal";
import SkillDetailModal from "@/components/modals/SkillDetailModal";
import ReferencesModal, { REFERENCES_DB } from "@/components/modals/ReferencesModal";
import DomainsModal from "@/components/modals/DomainsModal";

// Define Project structure
// Define Project structure
interface Project {
  id: string;
  title: string;
  category: "Frontend" | "Fullstack";
  type: "Freelance" | "Vendido";
  shortDesc: string;
  longDesc: string;
  problem: string;
  process: string[];
  features: string[];
  challenge: string;
  solution: string;
  tags: string[];
  color: string;
  stat: string;
  metric: string;
  githubUrl: string;
  liveUrl: string;
  status: "Activo" | "En Desarrollo" | "Discontinuado" | "Deprecado" | "Vendido";
}

// Custom data
const PROJECTS: Project[] = [
  {
    id: "florecitas",
    title: "Florecitas (Flower Garden)",
    category: "Frontend",
    type: "Freelance",
    shortDesc: "Aplicación web interactiva que recrea un jardín de peonías animadas con reproductor de música y sincronización de letras.",
    longDesc: "Aplicación web interactiva que recrea un jardín de peonías animadas acompañado de un reproductor de música con sincronización de letras en tiempo real. El proyecto incorpora animaciones CSS puras y avanzadas, un jardín con crecimiento floral progresivo, rotaciones por simulación de viento, caída dinámica de pétalos, mariposas en movimiento y un reproductor de audio completo con soporte para archivos LRC y transiciones cubic-bezier fluidas.",
    problem: "Crear una experiencia interactiva fluida con múltiples animaciones simultáneas y sincronización de audio/letras sin degradar el rendimiento o bloquear el hilo del navegador.",
    process: [
      "Diseño de animaciones CSS avanzadas utilizando cubic-bezier y transformaciones 3D aceleradas por GPU.",
      "Implementación del motor de reproducción de música utilizando la API nativa de Audio de HTML5.",
      "Sincronización milimétrica de archivos de letras LRC basada en eventos de tiempo de reproducción.",
      "Optimización de la carga diferida de imágenes y el renderizado responsivo de múltiples capas de césped y flores."
    ],
    features: [
      "Welcome Page con transiciones animadas de entrada y fondo estrellado dinámico.",
      "Jardín de peonías animadas en 3D simulado con crecimiento progresivo y físicas de viento.",
      "Reproductor musical integrado mediante una interfaz tipo Toast con letras sincronizadas.",
      "Sistema dinámico de partículas flotantes (pétalos y mariposas) en suspensión continua."
    ],
    challenge: "Sincronizar milimétricamente las letras del archivo LRC con la reproducción de audio en tiempo de ejecución de forma reactiva y sin retrasos.",
    solution: "Implementé una rutina de actualización periódica sobre el evento timeupdate de HTML5 Audio enlazada a un despachador de estados de React optimizado, previniendo re-renders innecesarios de las capas de animación inferiores.",
    tags: ["React", "Next.js 15", "TypeScript", "Pure CSS"],
    color: "bg-neo-yellow",
    stat: "Interactividad",
    metric: "60 FPS Animación",
    githubUrl: "https://github.com/WriteColor/florecitas",
    liveUrl: "https://florcita.jeremerc.dev/",
    status: "Activo",
  },
  {
    id: "shakai-store",
    title: "Shakai Store & Bot",
    category: "Fullstack",
    type: "Freelance",
    shortDesc: "Ecosistema de comercio electrónico serverless para la venta de productos digitales integrado con Discord.",
    longDesc: "Plataforma de comercio electrónico de alto rendimiento diseñada para la venta automatizada de productos digitales. El backend corre en la red global de Cloudflare Workers (usando Hono) conectándose a una base de datos Supabase PostgreSQL. Incluye autenticación mediante Discord OAuth2, integración completa con múltiples pasarelas de pago y un bot administrador de Discord dedicado para la automatización de entregas y roles de la comunidad.",
    problem: "Automatizar la confirmación de transacciones y entrega inmediata de roles/productos en Discord de forma segura, escalable y con costes de servidor mínimos.",
    process: [
      "Estructuración de una arquitectura modular desacoplada: frontend, backend, bot y base de datos.",
      "Desarrollo de API REST en la periferia (Edge Computing) con Hono y Cloudflare Workers.",
      "Integración de pasarelas de pago (PayPal, Braintree, NOWPayments) validando webhooks criptográficamente.",
      "Creación de bot de Discord (discord.js) para la gestión automática de tickets de soporte y roles de compra."
    ],
    features: [
      "Pasarelas integradas de PayPal, Braintree, Google Pay y NOWPayments (criptomonedas).",
      "Autenticación segura del cliente usando OAuth2 de Discord.",
      "Entrega automática en vivo de productos digitales mediante webhooks distribuidos.",
      "Dashboard administrativo centralizado con analíticas de ingresos y configuración segura."
    ],
    challenge: "Coordinar de manera atómica y tolerante a fallos la confirmación de pago externa, el registro en base de datos PostgreSQL y la entrega en Discord sin riesgo de doble cobro o entregas fallidas.",
    solution: "Diseñé un flujo de transacciones idempotente en Cloudflare Workers con colas asíncronas de reintentos, validando y firmando cada evento de webhook antes de persistir los datos de compra en Supabase.",
    tags: ["Next.js", "Cloudflare Workers", "Supabase", "Hono API"],
    color: "bg-neo-cyan",
    stat: "Integración",
    metric: "100% Serverless",
    githubUrl: "https://github.com/WriteColor/shakai-store",
    liveUrl: "https://www.shakai.store/",
    status: "En Desarrollo",
  },
  {
    id: "min-ai",
    title: "MIN — Asistente de IA",
    category: "Fullstack",
    type: "Freelance",
    shortDesc: "Asistente inteligente local con streaming de audio bidireccional y control integral de Windows 11.",
    longDesc: "Proyecto avanzado de asistente de inteligencia artificial con control completo sobre el sistema operativo Windows 11. Combina un backend en Python con una interfaz de escritorio ligera desarrollada en Tauri, Next.js, React y TypeScript. Ofrece streaming bidireccional de voz a través de Gemini Live API, widgets de sistema en tiempo real y una terminal segura de comandos.",
    problem: "Establecer comunicación por voz bidireccional en tiempo real con latencias de respuesta bajas y posibilitar la ejecución segura de comandos locales mediante IA.",
    process: [
      "Desarrollo de la interfaz modular de escritorio en Tauri utilizando Next.js y React.",
      "Establecimiento del túnel de audio en streaming bidireccional mediante WebSockets y Gemini Live API.",
      "Integración de reconocimiento de voz local offline (Vosk) y síntesis TTS con 8 voces dinámicas.",
      "Implementación de APIs de control de hardware de Windows (multimedia, volumen, brillo y ventanas)."
    ],
    features: [
      "Streaming bidireccional de audio en tiempo real y control multimedia por voz.",
      "Visión artificial integrada para la captura y análisis del monitor mediante IA.",
      "Widgets dinámicos locales (clima Open-Meteo, reloj, tareas, música).",
      "Terminal integrada con sistema avanzado de seguridad multinivel y autoedición protegida."
    ],
    challenge: "Prevenir que el modelo de lenguaje ejecute comandos destructivos o altere archivos críticos del sistema del usuario durante ejecuciones automatizadas.",
    solution: "Implementé una capa intermedia de seguridad (guardrails) en Python que analiza semánticamente los comandos generados, audita las llamadas mediante un sandbox de terminal y solicita confirmación explícita para operaciones de riesgo.",
    tags: ["Python", "Tauri", "Next.js", "Gemini API"],
    color: "bg-neo-pink",
    stat: "IA & Voz",
    metric: "<400ms Latencia",
    githubUrl: "https://github.com/WriteColor/Min-AI",
    liveUrl: "https://github.com/WriteColor/Min-AI",
    status: "Discontinuado",
  },
  {
    id: "bees-birthday",
    title: "Bee's Birthday Experience",
    category: "Frontend",
    type: "Freelance",
    shortDesc: "Experiencia web interactiva para cumpleaños con soplado de vela por micrófono y físicas de fotos.",
    longDesc: "Sitio interactivo festivo diseñado como regalo de cumpleaños. Utiliza Next.js 16, React 19, Framer Motion y Tailwind CSS para ofrecer una experiencia envolvente a través de una introducción guiada interactiva, un pastel animado con simulación de vela que se apaga soplando al micrófono físico, y una lluvia interactiva de fotos familiares.",
    problem: "Capturar el soplo del usuario de manera fluida en navegadores móviles (Safari/Chrome) respetando las restricciones de privacidad y el consumo de CPU.",
    process: [
      "Maquetación y animación de interfaces interactivas fluidas usando React 19 y Framer Motion.",
      "Mapeo de señales de audio con Web Audio API para la detección en tiempo real de volumen de aire.",
      "Integración de Sharp para el redimensionamiento, normalización y optimización de imágenes en servidor.",
      "Optimización de animaciones de físicas de colisión de fotos en móviles."
    ],
    features: [
      "Detección de soplido integrada con Web Audio API para apagar la vela digital.",
      "Lluvia interactiva de fotografías personalizables con físicas elásticas y carga diferida.",
      "Decoración y música de fondo controlada mediante disparadores de estado.",
      "Diseño responsivo optimizado para una experiencia móvil ininterrumpida."
    ],
    challenge: "Evitar el bloqueo del audio interactivo impuesto por políticas de seguridad de Safari en iOS que exigen interacción física previa del usuario.",
    solution: "Diseñé una Welcome Page con un botón de inicio que activa el AudioContext en respuesta a un evento de tap del usuario, desbloqueando los permisos del micrófono de manera fluida.",
    tags: ["Next.js", "React 19", "Framer Motion", "Web Audio API"],
    color: "bg-neo-green",
    stat: "Interactividad",
    metric: "100% Responsivo",
    githubUrl: "https://github.com/WriteColor/Bee-s-Birthday",
    liveUrl: "https://bee-s-birthday.mydev.es/",
    status: "Activo",
  },
  {
    id: "model-viewer-3d",
    title: "3D Model Viewer",
    category: "Frontend",
    type: "Freelance",
    shortDesc: "Visualizador y editor ligero de modelos 3D interactivo en navegador basado en Three.js.",
    longDesc: "Visualizador web tridimensional que permite a los usuarios interactuar con modelos 3D (GLTF/GLB) en tiempo real, con capacidades proyectadas para editar y manipular subcomponentes de la malla, similar a un editor 3D integrado directo en la web.",
    problem: "Renderizar mallas complejas y permitir la selección y manipulación individual de objetos tridimensionales a 60fps sin sobrecargar la memoria del navegador.",
    process: [
      "Configuración del renderizador WebGL, luces y cámaras mediante Three.js.",
      "Carga asíncrona optimizada de archivos GLTF con visualización de barra de progreso.",
      "Implementación de Raycasting para posibilitar la detección y selección de submallas al hacer click.",
      "Integración de controles de órbita y luces dinámicas para visualización de precisión."
    ],
    features: [
      "Renderizado acelerado por hardware para modelos GLTF y GLB en el navegador.",
      "Selección y aislamiento interactivo de piezas de la malla en tiempo real.",
      "Panel de control para modificar dinámicamente materiales, brillo y orientación de luces.",
      "Física de colisión virtual básica para manipulación e inspección de objetos."
    ],
    challenge: "Implementar un transform-gizmo preciso para trasladar y rotar submallas sin romper la estructura de nodos jerárquicos del modelo cargado.",
    solution: "Desarrollé un controlador de matrices locales en Three.js que detecta la selección de nodos secundarios y aplica transformaciones relativas preservando el sistema de coordenadas padre.",
    tags: ["Three.js", "WebGL", "TypeScript", "Canvas API"],
    color: "bg-neo-yellow",
    stat: "Gráficos 3D",
    metric: "60 FPS WebGL",
    githubUrl: "https://github.com/WriteColor",
    liveUrl: "https://github.com/WriteColor",
    status: "En Desarrollo",
  },
  {
    id: "minecraft-webstore",
    title: "Minecraft Web Store",
    category: "Fullstack",
    type: "Freelance",
    shortDesc: "Tienda de comercio electrónico integrada con servidores de Minecraft para entregas automáticas por RCON.",
    longDesc: "Tienda online completa orientada a la venta de productos y rangos digitales para servidores de videojuegos de Minecraft. Realiza la pasarela de transacciones e implementa la entrega automática de artículos en tiempo real ejecutando comandos seguros en el servidor mediante el protocolo RCON.",
    problem: "Coordinar pagos web y despachar comandos al servidor de juego de forma confiable, evitando pérdidas de productos ante caídas de red del servidor local.",
    process: [
      "Desarrollo de frontend de compras con catálogo y carrito de compras.",
      "Integración de pasarelas de pago y diseño de base de datos relacional PostgreSQL con Prisma.",
      "Construcción del cliente de comunicación RCON seguro en Node.js.",
      "Implementación del panel administrativo para la gestión de productos."
    ],
    features: [
      "Catálogo de ítems y rangos con actualización y visualización dinámica.",
      "Entrega automática en juego en menos de 5 segundos tras procesar el pago.",
      "Consola administrativa para monitorización de compras y estados de RCON.",
      "Protección anti-inyecciones y limitador de comandos RCON."
    ],
    challenge: "Evitar inyecciones de comandos maliciosos y garantizar la entrega de ítems incluso si el jugador está desconectado en el momento exacto del pago.",
    solution: "Implementé una cola de comandos en base de datos PostgreSQL y sanitización rigurosa de entradas de texto. Si el servidor de Minecraft o el jugador están desconectados, el sistema encola la entrega y la ejecuta inmediatamente cuando detecta al jugador en línea.",
    tags: ["React", "Node.js", "RCON Protocol", "PostgreSQL"],
    color: "bg-neo-pink",
    stat: "Integración",
    metric: "RCON Delivery",
    githubUrl: "https://github.com/WriteColor/web-store",
    liveUrl: "https://panel.tiendita.write-color.cloud/",
    status: "Discontinuado",
  },
  {
    id: "stitchhub",
    title: "StitchHub SaaS",
    category: "Fullstack",
    type: "Vendido",
    shortDesc: "Plataforma SaaS para la digitalización de sastrerías tradicionales con toma de medidas en 2D e integraciones de pago.",
    longDesc: "Aplicación web integral diseñada para digitalizar el flujo de trabajo de sastres tradicionales. Permite gestionar clientes, agendar citas e interactuar con una interfaz interactiva en 2D para la toma y visualización de medidas anatómicas. Implementa procesamiento de pagos recurrentes mediante Stripe e integra notificaciones automáticas mediante Twilio.",
    problem: "Crear una interfaz de usuario extremadamente simple e intuitiva para sastres tradicionales sin experiencia digital, garantizando al mismo tiempo un procesamiento de medidas robusto y seguro.",
    process: [
      "Diseño e implementación de la interfaz de toma de medidas utilizando Canvas 2D e interacciones dinámicas.",
      "Estructuración del flujo de suscripciones recurrentes con Stripe Billing.",
      "Integración del sistema de mensajería SMS a través de Twilio para recordatorios automatizados."
    ],
    features: [
      "Interfaz gráfica 2D intuitiva para registro de medidas corporales.",
      "Procesamiento de pagos y suscripciones SaaS integradas.",
      "Notificaciones push y alertas vía SMS de forma automatizada."
    ],
    challenge: "Diseñar la interfaz de medidas 2D de modo que los sastres pudieran usarla sin entrenamiento previo, manteniendo la precisión de los datos.",
    solution: "Desarrollé una cuadrícula visual responsiva con guías anatómicas interactivas que precalcula proporciones, reduciendo los errores de entrada manual.",
    tags: ["Next.js", "Tailwind CSS", "Stripe", "Twilio"],
    color: "bg-neo-cyan",
    stat: "Usabilidad",
    metric: "SaaS Ready",
    githubUrl: "",
    liveUrl: "",
    status: "Vendido"
  },
  {
    id: "cyberdither",
    title: "CyberDither",
    category: "Frontend",
    type: "Vendido",
    shortDesc: "Renderizador gráfico acelerado por GPU para procesamiento de imágenes con algoritmos de dithering en tiempo real.",
    longDesc: "Herramienta web interactiva para aplicar efectos estéticos de dithering y compresión de color retro en tiempo real. Utiliza WebGL y shaders personalizados de fragmentos (GLSL) en GPU para procesar imágenes de alta resolución a 60 FPS, evitando la sobrecarga y cuelgues del hilo principal de CPU en el navegador.",
    problem: "Procesar imágenes pesadas con algoritmos complejos de difusión de error en CPU generaba bloqueos y caídas notables en el rendimiento de la interfaz.",
    process: [
      "Escritura de shaders de fragmentos personalizados para la manipulación pixel a pixel en GPU.",
      "Estructuración del pipeline de texturas WebGL mediante la biblioteca OGL.",
      "Diseño de controles interactivos neo-brutalistas para ajustar el contraste, brillo y paletas cromáticas."
    ],
    features: [
      "Procesamiento de imágenes acelerado por hardware a 60 FPS.",
      "Múltiples algoritmos de dithering (Bayer, Floyd-Steinberg) integrados.",
      "Exportación rápida de imágenes procesadas en alta definición."
    ],
    challenge: "Implementar difusión de error dinámica en shaders, lo cual es intrínsecamente secuencial y difícil de paralelizar en GPU.",
    solution: "Desarrollé una aproximación multipasada utilizando Shaders de Fragmento y texturas de ruido ordenado en memoria WebGL, logrando una simulación idéntica a tiempo de hardware.",
    tags: ["WebGL", "GLSL", "OGL", "TypeScript"],
    color: "bg-neo-pink",
    stat: "Rendimiento",
    metric: "60 FPS GPU",
    githubUrl: "",
    liveUrl: "",
    status: "Vendido"
  },
  {
    id: "aerocargo",
    title: "AeroCargo Portal",
    category: "Fullstack",
    type: "Vendido",
    shortDesc: "Plataforma logística para la gestión y seguimiento de carga aérea con visualización de rutas geográficas en tiempo real.",
    longDesc: "Portal web corporativo de logística aérea que centraliza el registro, control de inventario de hangares, y rastreo de envíos. Cuenta con mapas geográficos interactivos para la visualización de rutas de vuelo aéreas en vivo, diseñado bajo una arquitectura modular resiliente y adaptable a cambios de requisitos de última hora.",
    problem: "Integrar servicios geográficos pesados y visualizaciones de vuelos dinámicos sin degradar la respuesta y velocidad del portal.",
    process: [
      "Desarrollo de API de geolocalización e integración con Leaflet/Mapbox para renderizado en mapa.",
      "Diseño del panel de control modular con persistencia ágil de datos.",
      "Optimización del flujo de carga de datos pesados para asegurar un portal ultra rápido."
    ],
    features: [
      "Mapas interactivos para visualización de vuelos y rutas aéreas en vivo.",
      "Control de inventarios de carga en hangares y flotas.",
      "Portal ultra veloz optimizado con técnicas de caché y renderizado estático."
    ],
    challenge: "Adaptar la plataforma en tiempo récord ante modificaciones estructurales de los esquemas de bases de datos solicitados al cierre de desarrollo.",
    solution: "Establecí una capa de abstracción de datos genérica utilizando TypeScript y repositorios modulares, aislando el esquema de la base de datos de los controladores visuales.",
    tags: ["Next.js", "Leaflet", "PostgreSQL", "TypeScript"],
    color: "bg-neo-yellow",
    stat: "Velocidad",
    metric: "100% Flexible",
    githubUrl: "",
    liveUrl: "",
    status: "Vendido"
  },
  {
    id: "neobrutal-ui",
    title: "Neobrutal UI",
    category: "Frontend",
    type: "Vendido",
    shortDesc: "Biblioteca de componentes React neobrutalistas animados con físicas de colisión y arrastre de resortes.",
    longDesc: "Kit de componentes y elementos visuales reutilizables bajo la tendencia estética neobrutalista. Implementa micro-interacciones interactivas, animaciones elásticas de colisión física, arrastres elásticos basados en resortes de Framer Motion, y accesibilidad completa mediante Radix UI primitives.",
    problem: "Crear animaciones elásticas complejas con colisiones físicas interactivas en componentes dinámicos sin causar retardos en el pintado del DOM.",
    process: [
      "Creación de tokens de diseño neobrutalistas (bordes negros gruesos, sombras rígidas y paletas curadas).",
      "Uso intensivo de Framer Motion para configurar físicas de resortes realistas.",
      "Optimización del rendimiento de renderizado en React evitando re-cálculos de colisiones innecesarios."
    ],
    features: [
      "Colección de botones, cards, pestañas y modales con físicas interactivas.",
      "Micro-animaciones elásticas para estados hover, click y drag.",
      "Totalmente responsive y adaptado a estándares de accesibilidad."
    ],
    challenge: "Lograr que los componentes colisionen y reboten elásticamente de forma natural dentro de layouts dinámicos.",
    solution: "Implementé detectores de posición en el viewport sincronizados con variables de fuerza elástica en el hook de control de animación de Framer Motion, emulando constantes físicas de masa y amortiguación.",
    tags: ["React", "Framer Motion", "Radix UI", "Tailwind CSS"],
    color: "bg-neo-green",
    stat: "Animación",
    metric: "Spring Physics",
    githubUrl: "",
    liveUrl: "",
    status: "Vendido"
  }
];

const getProjectStatusColor = (status: Project["status"]) => {
  switch (status) {
    case "Activo":
      return "bg-neo-green text-black";
    case "En Desarrollo":
      return "bg-neo-yellow text-black";
    case "Discontinuado":
      return "bg-neo-pink text-black";
    case "Vendido":
      return "bg-neo-cyan text-black border-sky-600 shadow-[1px_1px_0px_0px_#000]";
    default:
      return "bg-zinc-400 text-black";
  }
};
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

  const filteredProjects = activeCategory === "All"
    ? PROJECTS
    : activeCategory === "Freelance"
      ? PROJECTS.filter(p => p.type === "Freelance")
      : PROJECTS.filter(p => p.category === activeCategory);

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

  const [stats, setStats] = useState({ visits: 1482, likes: 314, dislikes: 8 });
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null);

  useEffect(() => {
    // Fetch stats
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.visits) {
          setStats({
            visits: data.visits,
            likes: data.likes,
            dislikes: data.dislikes,
          });
        }
      })
      .catch((err) => console.error("Error fetching stats:", err));

    // Register unique visit
    const hasVisited = localStorage.getItem("visited_jeremerc_v2");
    if (!hasVisited) {
      fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "visit" }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.visits) {
            setStats({
              visits: data.visits,
              likes: data.likes,
              dislikes: data.dislikes,
            });
            localStorage.setItem("visited_jeremerc_v2", "true");
          }
        })
        .catch((err) => console.error("Error recording visit:", err));
    }

    // Read user vote
    const savedVote = localStorage.getItem("user_vote_feedback") as "like" | "dislike" | null;
    if (savedVote) {
      setUserVote(savedVote);
    }
  }, []);

  const handleVote = (voteType: "like" | "dislike") => {
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
  };

  // References autoplay cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setRefIndex((prev) => (prev + 1) % REFERENCES_DB.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Central Scroll Lock manager when any modal is open
  const isAnyModalOpen = !!selectedSkillName || !!expandedCard || isSpecsModalOpen || isReferencesModalOpen || isDomainsModalOpen;

  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
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



  const renderSkillTags = (skills: string[], color: string) => {
    return skills.map((skill, idx) => (
      <button
        key={idx}
        onClick={() => setSelectedSkillName(skill)}
        className={`px-4 py-2 border-2 border-[var(--c-border)] font-display font-bold uppercase text-xs tracking-wider shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] inline-block ${color} text-black cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-transform`}
      >
        {skill} <span className="font-mono text-[9px] font-black">+</span>
      </button>
    ));
  };

  return (
    <main className="relative min-h-screen p-3 sm:p-4 md:p-8 flex items-center justify-center">
      {/* Background ShapeGrid (High-Performance lightweight Canvas 2D) */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none" style={{ pointerEvents: 'none' }}>
        <ShapeGridBackground paused={isAnyModalOpen} />
      </div>

      {/* Grid Layout Container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6 relative z-10">

        {/* Theme Switcher and Header Widget */}
        <div className="flex justify-between items-center px-1 sm:px-2">
          <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs font-bold text-[var(--c-text-muted)]">
            <Terminal size={14} /> status: production_build_active
          </div>

          <button
            onClick={toggleTheme}
            className="neo-btn bg-[var(--c-surface)] px-3 py-1.5 text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer"
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

        {/* Bento Grid wrapped in LayoutGroup for smooth physics transitions */}
        <LayoutGroup>
          <motion.div
            layout="position"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 auto-rows-[minmax(160px,auto)] sm:auto-rows-[minmax(180px,auto)]"
          >

            {/* ═══ CELL 1: Interactive Profile Card (Who I Am) ═══ */}
            <motion.div
              layout="position"
              className={`sm:col-span-2 md:col-span-2 md:row-span-2 ${isThemeChanging ? "theme-bump" : ""}`}
            >
              <DecayCard maxTilt={10} className="w-full h-full">
                <div className="flex flex-col justify-between h-full min-h-[320px] sm:min-h-[380px]">

                  {/* Header Profile Info */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {/* Stylized Avatar Placeholder (CSS Art) */}
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 border-4 border-[var(--c-border)] bg-neo-yellow overflow-hidden shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] flex-shrink-0">
                        <div className="absolute inset-0 bg-[radial-gradient(#000_20%,transparent_20%)] [background-size:8px_8px] opacity-20" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-t-full bg-black border-2 border-black" />
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 border-black flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                        </div>
                      </div>
                      <div>
                        <h1 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-[var(--c-text)]">
                          Jeremyah
                        </h1>
                        <div className="flex flex-wrap gap-2 items-center mt-0.5">
                          <span className="font-mono text-[10px] sm:text-xs font-bold text-[var(--c-text-muted)] flex-shrink-0">
                            @WriteColor
                          </span>
                          <button
                            onClick={() => setIsSpecsModalOpen(true)}
                            className="font-mono text-[9px] font-bold text-neo-cyan cursor-pointer flex items-center gap-1 border-2 border-[var(--c-border)] px-1.5 py-0.5 bg-[var(--c-surface)] shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] hover:-translate-y-0.5 active:translate-y-0 transition-transform flex-shrink-0 whitespace-nowrap"
                          >
                            <Laptop size={10} /> Specs +
                          </button>
                          <button
                            onClick={() => setIsDomainsModalOpen(true)}
                            className="font-mono text-[9px] font-bold text-neo-yellow cursor-pointer flex items-center gap-1 border-2 border-[var(--c-border)] px-1.5 py-0.5 bg-[var(--c-surface)] shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] hover:-translate-y-0.5 active:translate-y-0 transition-transform flex-shrink-0 whitespace-nowrap"
                          >
                            <Globe size={10} /> Dominios +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Pulsing Status Beacon - Redesigned to be premium neobrutalist */}
                    <span className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 border-2 border-black bg-neo-green font-display font-black uppercase text-[8px] sm:text-[10px] tracking-wider text-black shadow-[2px_2px_0px_0px_#000] flex-shrink-0 select-none">
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
                  <div className="grid grid-cols-2 gap-2 border-t-4 border-dashed border-[var(--c-border)]/20 pt-3 sm:pt-4 mb-2 sm:mb-3">
                    <div className="flex flex-col">
                      <span className="font-display font-black text-xl sm:text-2xl text-neo-pink leading-none">98%</span>
                      <span className="font-mono text-[8px] sm:text-[9px] uppercase font-bold text-[var(--c-text-muted)]">Score de Optimización</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display font-black text-xl sm:text-2xl text-neo-cyan leading-none">100%</span>
                      <span className="font-mono text-[8px] sm:text-[9px] uppercase font-bold text-[var(--c-text-muted)]">Calidad de Código</span>
                    </div>
                  </div>

                  {/* Footer Bio summary */}
                  <div>
                    <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tighter leading-none mb-1 text-[var(--c-text)]">
                      Full Stack Developer
                    </h2>
                    <p className="font-sans text-xs sm:text-sm text-[var(--c-text-muted)] font-medium">
                      Desarrollador web, asistentes de IA y arquitectura de software escalable.
                    </p>
                  </div>
                </div>
              </DecayCard>
            </motion.div>

            {/* ═══ CELL 2: Biography & Studies (CardSwap) ═══ */}
            <motion.div
              layout="position"
              className={`sm:col-span-2 md:col-span-2 md:row-span-1 ${isThemeChanging ? "theme-bump" : ""}`}
            >
              <CardSwap
                className="w-full h-full min-h-[180px]"
                front={
                  <div className="neo-card p-4 sm:p-6 h-full flex flex-col justify-between hover:bg-[var(--c-surface-hover)] transition-colors relative">
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-display font-black text-[10px] sm:text-xs uppercase bg-[var(--c-text)] text-[var(--c-bg)] px-2 py-1">
                        Quién Soy
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedCard("quien-soy");
                        }}
                        className="font-mono text-[9px] sm:text-[10px] font-black uppercase text-neo-pink border-2 border-[var(--c-border)] px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] bg-[var(--c-surface)] cursor-pointer flex-shrink-0"
                      >
                        Expandir +
                      </button>
                    </div>
                    <p className="font-sans text-xs sm:text-sm font-semibold text-[var(--c-text)] my-3 leading-snug">
                      Soy un desarrollador de software Full Stack apasionado por crear aplicaciones web modernas, robustas, escalables y visualmente atractivas.
                    </p>
                    <div className="font-display font-bold text-xs uppercase flex justify-between items-center text-[var(--c-text)]">
                      <div className="flex gap-3 sm:gap-4">
                        <span>📍 Remoto</span>
                        <span>⚡ Rápido</span>
                      </div>
                      <span className="font-mono text-[9px] text-[var(--c-text-subtle)] flex items-center gap-1">
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
                      <div className="flex gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedCard("estudios");
                          }}
                          className="font-mono text-[9px] font-black uppercase text-black border-2 border-black px-1.5 py-0.5 shadow-[2px_2px_0px_0px_#000] bg-white cursor-pointer"
                        >
                          Estudios +
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedCard("foco");
                          }}
                          className="font-mono text-[9px] font-black uppercase text-black border-2 border-black px-1.5 py-0.5 shadow-[2px_2px_0px_0px_#000] bg-white cursor-pointer"
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
              layout="position"
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
              layout="position"
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
              layout="position"
              className={`sm:col-span-2 ${isThemeChanging ? "theme-bump" : ""}`}
            >
              <div className="neo-card p-4 sm:p-6 h-full flex flex-col justify-between overflow-hidden min-h-[160px] sm:min-h-[180px]">
                <div className="flex justify-between items-center self-stretch">
                  <span className="font-display font-black text-[10px] sm:text-xs uppercase bg-[var(--c-text)] text-[var(--c-bg)] px-2 py-1">
                    Skills & Stacks
                  </span>
                  <button
                    onClick={() => setSelectedSkillName("all")}
                    className="font-mono text-[8px] sm:text-[9px] font-black uppercase text-neo-pink border-2 border-[var(--c-border)] px-1.5 py-0.5 bg-[var(--c-surface)] shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
                  >
                    Pulse para detalle +
                  </button>
                </div>

                <div className="my-3 flex flex-col gap-2">
                  <LogoLoop items={renderSkillTags(SKILLS_FRONT, "bg-neo-cyan")} speed="medium" direction="left" />
                  <LogoLoop items={renderSkillTags(SKILLS_BACK, "bg-neo-pink")} speed="medium" direction="right" />
                </div>

                <div className="font-mono text-[9px] sm:text-[10px] font-bold text-[var(--c-text-muted)] uppercase">
                  Interacciones fluidas & API Robustas
                </div>
              </div>
            </motion.div>

            {/* ═══ CELL 6: Collaboration Terms / Contact Form ═══ */}
            <motion.div
              layout="position"
              id="contacto-showcase"
              className={`sm:col-span-2 ${isThemeChanging ? "theme-bump" : ""}`}
            >
              <PixelCard pixelColor="#FF4E88" className="h-full">
                <div className="p-4 sm:p-6 h-full flex flex-col justify-between min-h-[160px]">
                  <div className="flex justify-between items-center mb-1 gap-2">
                    <span className="font-display font-black text-[10px] sm:text-xs uppercase bg-[var(--c-text)] text-[var(--c-bg)] px-2 py-1">
                      Colaborar Conmigo
                    </span>
                    <button
                      onClick={() => setShowContactForm(!showContactForm)}
                      className="font-mono text-[9px] sm:text-[10px] font-black uppercase text-neo-pink border-2 border-[var(--c-border)] px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] bg-[var(--c-surface)] cursor-pointer flex-shrink-0"
                    >
                      {showContactForm ? "Ver Info" : "Escríbeme +"}
                    </button>
                  </div>

                  {showContactForm ? (
                    <div className="my-2 text-left">
                      <ContactForm
                        onClose={() => {
                          setShowContactForm(false);
                          setContactPrefill("");
                        }}
                        initialMessage={contactPrefill}
                      />
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-3">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1 text-neo-pink">
                            <Clock size={16} className="stroke-[3]" />
                            <span className="font-display font-black text-xs uppercase text-[var(--c-text)]">Tiempos</span>
                          </div>
                          <span className="font-mono text-[10px] font-bold text-[var(--c-text-muted)]">Flexibles & veloces</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1 text-neo-yellow">
                            <CircleDollarSign size={16} className="stroke-[3]" />
                            <span className="font-display font-black text-xs uppercase text-[var(--c-text)]">Presupuesto</span>
                          </div>
                          <span className="font-mono text-[10px] font-bold text-[var(--c-text-muted)]">Adaptable al producto</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1 text-neo-cyan">
                            <CheckCircle2 size={16} className="stroke-[3]" />
                            <span className="font-display font-black text-xs uppercase text-[var(--c-text)]">Entrega</span>
                          </div>
                          <span className="font-mono text-[10px] font-bold text-[var(--c-text-muted)]">Calidad garantizada</span>
                        </div>
                      </div>

                      <div className="font-sans text-[10px] sm:text-[11px] font-bold text-[var(--c-text)] leading-tight">
                        Listo para desarrollar soluciones a medida. Sin rodeos comerciales agresivos, solo ingeniería sólida.
                      </div>
                    </>
                  )}
                </div>
              </PixelCard>
            </motion.div>

            {/* ═══ CELL 7: Projects Showcase ═══ */}
            <motion.div
              layout="position"
              id="proyectos-showcase"
              className={`sm:col-span-2 md:col-span-3 md:row-span-2 ${isThemeChanging ? "theme-bump" : ""}`}
            >
              <div className="neo-card p-4 sm:p-6 h-full flex flex-col justify-between">

                {/* Header with Custom Category Filter buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                  <span className="font-display font-black text-[10px] sm:text-xs uppercase bg-[var(--c-text)] text-[var(--c-bg)] px-2 py-1">
                    Proyectos Freelance & Propios
                  </span>

                  {/* Filter tabs */}
                  <div className="flex flex-wrap gap-1.5">
                    {(["All", "Freelance", "Frontend", "Fullstack"] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-2.5 sm:px-3 py-1 border-2 border-[var(--c-border)] font-display font-bold text-[10px] sm:text-xs uppercase transition-all duration-150 cursor-pointer ${activeCategory === cat
                          ? "bg-[var(--c-text)] text-[var(--c-bg)] translate-x-[1px] translate-y-[1px] shadow-[1px_1px_0px_0px_rgba(var(--c-shadow),1)]"
                          : "bg-[var(--c-surface)] text-[var(--c-text)] shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px]"
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
                              className="neo-card hover:bg-[var(--c-surface-hover)] p-3 sm:p-4 flex flex-col justify-between h-auto min-h-[120px] sm:min-h-[130px] relative group overflow-hidden cursor-pointer text-left w-full"
                            >
                              <div className="absolute top-0 right-0 h-5 sm:h-6 px-2.5 border-b-2 border-l-2 border-[var(--c-border)] font-display font-bold text-[8px] sm:text-[9px] uppercase bg-[var(--c-surface)] text-[var(--c-text)] flex items-center justify-center shadow-[-2px_2px_0px_0px_rgba(var(--c-shadow),1)]">
                                {project.type}
                              </div>

                              <div>
                                <div className="flex flex-wrap gap-1.5 items-center">
                                  <span className={`px-2 py-0.5 border-2 border-[var(--c-border)] font-display font-black text-[8px] sm:text-[9px] uppercase tracking-wider ${project.color} text-black shadow-[1px_1px_0px_0px_#000]`}>
                                    {project.stat}
                                  </span>
                                  <span className={`px-2 py-0.5 border-2 border-black font-display font-black text-[8px] sm:text-[9px] uppercase tracking-wider ${getProjectStatusColor(project.status)} shadow-[1px_1px_0px_0px_#000]`}>
                                    {project.status}
                                  </span>
                                </div>
                                <h4 className="font-display font-black text-base sm:text-lg uppercase tracking-tight mt-2 leading-none text-[var(--c-text)]">
                                  {project.title}
                                </h4>
                                <p className="font-sans text-[10px] sm:text-xs font-semibold text-[var(--c-text-muted)] mt-1 line-clamp-2">
                                  {project.shortDesc}
                                </p>
                              </div>

                              <div className="flex justify-between items-center mt-3 pt-2 border-t border-[var(--c-border)]/10">
                                <div className="flex gap-2 items-center">
                                  <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase text-[var(--c-text)]">
                                    {project.metric}
                                  </span>
                                  <span className="px-1.5 py-0.5 border border-[var(--c-border)] font-display font-black text-[7px] sm:text-[8px] uppercase bg-[var(--c-surface-hover)] text-[var(--c-text-muted)]">
                                    {project.category}
                                  </span>
                                </div>
                                <span className="font-display font-bold text-[10px] sm:text-xs uppercase text-[var(--c-text)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
                              className="w-full flex-shrink-0 px-1 will-change-[opacity,filter]"
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
                                    onClick={() => setExpandedCard(project)}
                                    className="neo-card hover:bg-[var(--c-surface-hover)] p-3 sm:p-4 flex flex-col justify-between h-auto min-h-[120px] sm:min-h-[130px] relative group overflow-hidden cursor-pointer text-left w-full"
                                  >
                                    <div className="absolute top-0 right-0 h-5 sm:h-6 px-2.5 border-b-2 border-l-2 border-[var(--c-border)] font-display font-bold text-[8px] sm:text-[9px] uppercase bg-[var(--c-surface)] text-[var(--c-text)] flex items-center justify-center shadow-[-2px_2px_0px_0px_rgba(var(--c-shadow),1)]">
                                      {project.type}
                                    </div>

                                    <div>
                                      <div className="flex flex-wrap gap-1.5 items-center">
                                        <span className={`px-2 py-0.5 border-2 border-[var(--c-border)] font-display font-black text-[8px] sm:text-[9px] uppercase tracking-wider ${project.color} text-black shadow-[1px_1px_0px_0px_#000]`}>
                                          {project.stat}
                                        </span>
                                        <span className={`px-2 py-0.5 border-2 border-black font-display font-black text-[8px] sm:text-[9px] uppercase tracking-wider ${getProjectStatusColor(project.status)} shadow-[1px_1px_0px_0px_#000]`}>
                                          {project.status}
                                        </span>
                                      </div>
                                      <h4 className="font-display font-black text-base sm:text-lg uppercase tracking-tight mt-2 leading-none text-[var(--c-text)]">
                                        {project.title}
                                      </h4>
                                      <p className="font-sans text-[10px] sm:text-xs font-semibold text-[var(--c-text-muted)] mt-1 line-clamp-2">
                                        {project.shortDesc}
                                      </p>
                                    </div>

                                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-[var(--c-border)]/10">
                                      <div className="flex gap-2 items-center">
                                        <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase text-[var(--c-text)]">
                                          {project.metric}
                                        </span>
                                        <span className="px-1.5 py-0.5 border border-[var(--c-border)] font-display font-black text-[7px] sm:text-[8px] uppercase bg-[var(--c-surface-hover)] text-[var(--c-text-muted)]">
                                          {project.category}
                                        </span>
                                      </div>
                                      <span className="font-display font-bold text-[10px] sm:text-xs uppercase text-[var(--c-text)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
                    <div className="text-center font-mono text-xs text-[var(--c-text-muted)] py-8 border-2 border-dashed border-[var(--c-border)]/20">
                      No se encontraron proyectos para esta categoría
                    </div>
                  )}
                  {isTouchDevice && (
                    <div className="block sm:hidden font-mono text-[7px] text-[var(--c-text-subtle)] uppercase text-center mt-2.5 animate-pulse select-none">
                      ← Desliza hacia los lados para cambiar de página →
                    </div>
                  )}
                </div>

                {/* Status and Pagination footer inside projects */}
                <div className="border-t-2 border-[var(--c-border)] pt-3 mt-4 grid grid-cols-3 items-center text-[var(--c-text-muted)] font-mono text-[9px] sm:text-[10px] font-bold uppercase select-none w-full">
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
                          }}
                          disabled={projectPage === 0}
                          className="p-1.5 sm:p-2 border-2 border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-text)] shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_0px_rgba(var(--c-shadow),1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-100 flex items-center justify-center cursor-pointer"
                          title="Página Anterior"
                        >
                          <ChevronLeft size={12} className="stroke-[3]" />
                        </button>
                        <span className="text-[9px] sm:text-xs font-black min-w-[55px] sm:min-w-[65px] text-center">
                          Pág {projectPage + 1} / {pageCount}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setProjectPage(prev => Math.min(pageCount - 1, prev + 1));
                          }}
                          disabled={projectPage === pageCount - 1}
                          className="p-1.5 sm:p-2 border-2 border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-text)] shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_0px_rgba(var(--c-shadow),1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-100 flex items-center justify-center cursor-pointer"
                          title="Siguiente Página"
                        >
                          <ChevronRight size={12} className="stroke-[3]" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right text-[7px] sm:text-[9px] text-[var(--c-text-subtle)] truncate">
                    JEREMERC.DEV
                  </div>
                </div>

              </div>
            </motion.div>

            {/* ═══ CELL 8: Instagram Button ═══ */}
            <motion.div
              layout="position"
              className={`${isThemeChanging ? "theme-bump" : ""}`}
            >
              <a
                href="https://www.instagram.com/m.jere_echev/"
                target="_blank"
                rel="noopener noreferrer"
                className="block group h-full"
              >
                <div className="neo-card-brand bg-[#E1306C] hover:bg-[#C13584] text-white p-4 sm:p-6 h-full flex flex-col justify-between transition-colors min-h-[140px] sm:min-h-[180px]">
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
              layout="position"
              className={`${isThemeChanging ? "theme-bump" : ""}`}
            >
              <CardSwap
                className="w-full h-full min-h-[160px] sm:min-h-[180px]"
                front={
                  <div className="neo-card p-4 sm:p-6 h-full flex flex-col justify-between items-center text-center hover:bg-[var(--c-surface-hover)]">
                    <div className="border-4 border-[var(--c-border)] bg-neo-yellow p-3 shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)]">
                      <Lock size={24} className="stroke-[2.5] text-black sm:w-7 sm:h-7" />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-xs sm:text-sm uppercase leading-none mt-2 text-[var(--c-text)]">
                        Referencias
                      </h3>
                      <p className="font-mono text-[8px] sm:text-[9px] uppercase font-bold text-[var(--c-text-muted)] mt-1">
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
                      <div className="flex items-center justify-between gap-1.5 flex-shrink-0">
                        <span className="font-display font-black text-[8px] sm:text-[9px] uppercase bg-neo-cyan text-black px-1.5 py-0.5 shadow-[1px_1px_0px_0px_rgba(var(--c-shadow),1)] border border-[var(--c-border)] select-none">
                          Opinión {refIndex + 1}/{REFERENCES_DB.length}
                        </span>
                        <div className="flex gap-1 items-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsReferencesModalOpen(true);
                            }}
                            className="font-mono text-[8px] font-black text-neo-pink uppercase cursor-pointer border-2 border-[var(--c-border)] px-1.5 py-0.5 bg-[var(--c-surface)] shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] hover:-translate-y-0.5 active:translate-y-0 transition-transform flex-shrink-0"
                          >
                            Ver Todas +
                          </button>
                          <Unlock size={10} className="text-neo-pink animate-pulse flex-shrink-0" />
                        </div>
                      </div>

                      {/* Content Area - Scrollable when height is compressed */}
                      <div className="flex-grow overflow-y-auto flex flex-col justify-center min-h-[30px] pr-0.5 scrollbar-thin select-none">
                        <p className="font-sans text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-[var(--c-text)] italic leading-tight">
                          &quot;{REFERENCES_DB[refIndex].text}&quot;
                        </p>
                        <span className="font-mono text-[7px] sm:text-[8px] md:text-[9px] font-black uppercase text-[var(--c-text-muted)] block mt-1 text-right">
                          — {REFERENCES_DB[refIndex].author} ({REFERENCES_DB[refIndex].role})
                        </span>
                      </div>

                      {/* Manual Carousel Controls */}
                      <div className="flex justify-between items-center border-t border-[var(--c-border)]/10 pt-2">
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setRefIndex((prev) => (prev - 1 + REFERENCES_DB.length) % REFERENCES_DB.length);
                            }}
                            className="p-2 border-2 border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-text)] shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_0px_rgba(var(--c-shadow),1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-100 flex items-center justify-center cursor-pointer"
                            title="Opinión Anterior"
                          >
                            <ChevronLeft size={14} className="stroke-[3]" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setRefIndex((prev) => (prev + 1) % REFERENCES_DB.length);
                            }}
                            className="p-2 border-2 border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-text)] shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_0px_rgba(var(--c-shadow),1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-100 flex items-center justify-center cursor-pointer"
                            title="Siguiente Opinión"
                          >
                            <ChevronRight size={14} className="stroke-[3]" />
                          </button>
                        </div>
                        <span className="font-mono text-[7px] sm:text-[8px] uppercase text-[var(--c-text-subtle)] select-none">
                          Cierra clickeando de nuevo
                        </span>
                      </div>
                    </div>
                  </div>
                }
              />
            </motion.div>

          </motion.div>
        </LayoutGroup>

        {/* Footer Accent Decoration & Stats Metric Tracker */}
        <div className="neo-card p-4 md:p-5 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-5 text-center md:text-left bg-[var(--c-surface)]">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full md:w-auto">
            {/* Visitors metric badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-[var(--c-border)] bg-[var(--c-surface-hover)] shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] font-mono text-[10px] sm:text-xs font-bold text-[var(--c-text)]">
              <Eye size={12} className="text-neo-cyan animate-pulse" />
              <span>Visitas únicas: <span className="font-black text-neo-cyan">{stats.visits.toLocaleString()}</span></span>
            </div>

            {/* Voting Component */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] sm:text-xs text-[var(--c-text-muted)] uppercase font-bold">¿Te gusta el portfolio?</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleVote("like")}
                  disabled={!!userVote}
                  className={`p-1.5 border-2 transition-transform flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase cursor-pointer ${userVote === "like"
                    ? "bg-emerald-500 text-black border-black translate-x-[1px] translate-y-[1px] shadow-none"
                    : userVote
                      ? "opacity-30 grayscale cursor-not-allowed border-zinc-300 dark:border-zinc-700"
                      : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 dark:border-emerald-500/50 shadow-[2px_2px_0px_0px_rgba(16,185,129,0.2)] hover:-translate-y-0.5 active:translate-y-0"
                    }`}
                  title={userVote ? "Ya has calificado" : "Me gusta"}
                >
                  <ThumbsUp size={12} className={userVote === "like" ? "fill-black" : ""} />
                  <span>{stats.likes}</span>
                </button>

                <button
                  onClick={() => handleVote("dislike")}
                  disabled={!!userVote}
                  className={`p-1.5 border-2 transition-transform flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase cursor-pointer ${userVote === "dislike"
                    ? "bg-rose-500 text-black border-black translate-x-[1px] translate-y-[1px] shadow-none"
                    : userVote
                      ? "opacity-30 grayscale cursor-not-allowed border-zinc-300 dark:border-zinc-700"
                      : "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 dark:border-rose-500/50 shadow-[2px_2px_0px_0px_rgba(244,63,94,0.2)] hover:-translate-y-0.5 active:translate-y-0"
                    }`}
                  title={userVote ? "Ya has calificado" : "No me gusta"}
                >
                  <ThumbsDown size={12} className={userVote === "dislike" ? "fill-black" : ""} />
                  <span>{stats.dislikes}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1 font-mono text-[9px] sm:text-xs text-[var(--c-text-muted)] w-full md:w-auto">
            <span>© 2026 Jeremyah (WriteColor). Construido bajo la filosofía Neobrutalist + BaseUI.</span>
            {/*<span className="text-[8px] opacity-75">Datos persistidos en Vercel Serverless Edge</span>*/}
          </div>
        </div>

      </div>

      {/* ═══ MODAL OVERLAYS ═══ */}
      <AnimatePresence>
        {expandedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[var(--c-overlay-bg)] backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4"
            onClick={() => setExpandedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="neo-card p-5 sm:p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-[10px_10px_0px_0px_rgba(var(--c-shadow),1)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Escape key listener inside the modal context */}
              <ModalEscapeHandler onClose={() => setExpandedCard(null)} />

              {/* Unified Header Row (Prevents close button overlap) */}
              <div className="flex items-center justify-between border-b-2 border-[var(--c-border)]/10 pb-3.5 mb-4">
                <div className="flex items-center gap-2">
                  {expandedCard === "quien-soy" && (
                    <div className="flex items-center gap-1.5 text-neo-pink">
                      <Sparkles className="stroke-[2.5]" size={16} />
                      <span className="font-display font-black text-xs uppercase bg-[var(--c-text)] text-[var(--c-bg)] px-2 py-0.5">Trayectoria</span>
                    </div>
                  )}
                  {expandedCard === "estudios" && (
                    <div className="flex items-center gap-1.5 text-neo-cyan">
                      <BookOpen className="stroke-[2.5]" size={16} />
                      <span className="font-display font-black text-xs uppercase bg-[var(--c-text)] text-[var(--c-bg)] px-2 py-0.5">Educación</span>
                    </div>
                  )}
                  {expandedCard === "foco" && (
                    <div className="flex items-center gap-1.5 text-neo-yellow">
                      <Target className="stroke-[2.5]" size={16} />
                      <span className="font-display font-black text-xs uppercase bg-[var(--c-text)] text-[var(--c-bg)] px-2 py-0.5">Especialización</span>
                    </div>
                  )}
                  {typeof expandedCard === "object" && expandedCard !== null && "category" in expandedCard && (
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 border-2 border-[var(--c-border)] font-display font-black text-[9px] sm:text-[10px] uppercase tracking-wider ${expandedCard.color} text-black shadow-[1px_1px_0px_0px_#000]`}>
                        {expandedCard.type}
                      </span>
                      <span className="px-2 py-0.5 border-2 border-[var(--c-border)] font-mono text-[9px] sm:text-[10px] uppercase font-bold text-[var(--c-text)] bg-[var(--c-surface-hover)]">
                        {expandedCard.category}
                      </span>
                      <span className="font-mono text-[9px] sm:text-[10px] font-black uppercase text-[var(--c-text-muted)]">
                        {expandedCard.metric}
                      </span>
                    </div>
                  )}
                </div>

                {/* Unified Close Button */}
                <button
                  onClick={() => setExpandedCard(null)}
                  aria-label="Cerrar modal"
                  className="p-1.5 border-2 border-[var(--c-border)] shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] bg-neo-pink text-black hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] cursor-pointer"
                >
                  <X size={16} className="stroke-[3] sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>

              {/* BIO CARD EXPANSION */}
              {expandedCard === "quien-soy" && (
                <div className="space-y-4 sm:space-y-5">
                  <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[var(--c-text)]">Biografía Completa</h3>
                  <div className="space-y-4 font-sans text-xs sm:text-sm text-[var(--c-text)] leading-relaxed font-semibold">
                    <p>
                      Soy un desarrollador de software con una profunda pasión por construir aplicaciones web modernas, robustas, escalables y con un diseño visual interactivo de alta fidelidad. Mi trayectoria comenzó como graduado de Bachillerato Técnico Profesional (BTP) en Informática en 2024, lo que me otorgó una base sólida en mantenimiento de sistemas, soporte y administración de redes locales.
                    </p>
                    <div className="border-l-4 border-neo-pink pl-4 py-1.5 bg-[var(--c-surface-hover)] font-mono text-[10px] sm:text-xs">
                      <span className="text-neo-pink font-black block">FILOSOFÍA DE TRABAJO (ARTESANÍA DEL CÓDIGO):</span>
                      &quot;Me dedico a escribir software mantenible y modular, optimizando cada milisegundo de rendimiento visual en la interfaz y diseñando arquitecturas distribuidas en la periferia (Edge Computing) para que el navegador se sienta vivo, fluido y responda en tiempo real.&quot;
                    </div>
                    <p>
                      Actualmente continúo mi formación como estudiante de Ingeniería en Ciencia de Datos e Inteligencia Artificial. Esto me permite especializarme en la intersección de modelos de lenguaje avanzados, procesamiento de datos masivos y sistemas de audio bidireccionales en tiempo real (STT/TTS/VAD). Combino mi formación académica con un desarrollo autodidacta intensivo en infraestructura de servidores Linux VPS, virtualización con Docker y el despliegue de soluciones tolerantes a fallos en la nube.
                    </p>
                  </div>

                  <div className="border-t-2 border-[var(--c-border)] pt-4 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="font-display font-black text-xs uppercase block text-neo-pink">Objetivos</span>
                      <span className="font-sans text-[10px] sm:text-xs text-[var(--c-text-muted)] font-bold block mt-1">
                        Especializarme en gráficos de alto rendimiento en navegador (WebGL/WebGPU) y aportar a proyectos interactivos a gran escala.
                      </span>
                    </div>
                    <div>
                      <span className="font-display font-black text-xs uppercase block text-neo-cyan">Colaboraciones</span>
                      <span className="font-sans text-[10px] sm:text-xs text-[var(--c-text-muted)] font-bold block mt-1">
                        Abierto a trabajar en equipos dinámicos en remoto, con horarios flexibles y presupuestos que se amolden al tamaño del producto.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* STUDIES CARD EXPANSION */}
              {expandedCard === "estudios" && (
                <div className="space-y-4 sm:space-y-5">
                  <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[var(--c-text)]">Formación Académica</h3>

                  <div className="space-y-4 font-sans text-xs sm:text-sm text-[var(--c-text)]">
                    <div className="border-3 border-[var(--c-border)] p-3 sm:p-4 bg-[var(--c-surface-hover)] relative shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)]">
                      <div className="absolute top-2 right-2 flex items-center gap-1 text-neo-cyan font-mono text-[9px] font-bold">
                        <Calendar size={10} /> En Curso
                      </div>
                      <span className="font-mono text-xs font-bold text-neo-cyan uppercase">Grado Universitario</span>
                      <h4 className="font-display font-black text-base sm:text-lg uppercase mt-1 text-[var(--c-text)]">Ingeniería en Ciencia de Datos & IA</h4>
                      <p className="font-semibold text-[10px] sm:text-xs mt-1 text-[var(--c-text-muted)]">
                        Estudios enfocados en la construcción de algoritmos de optimización matemática, estructuras de datos complejas, análisis predictivo de datos masivos y el diseño e integración de redes neuronales artificiales y Machine Learning.
                      </p>
                    </div>

                    <div className="border-3 border-[var(--c-border)] p-3 sm:p-4 bg-[var(--c-surface-hover)] relative shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)]">
                      <div className="absolute top-2 right-2 flex items-center gap-1 text-neo-yellow font-mono text-[9px] font-bold">
                        <Award size={10} /> Graduado 2024
                      </div>
                      <span className="font-mono text-xs font-bold text-neo-yellow uppercase">Educación Secundaria Técnica</span>
                      <h4 className="font-display font-black text-base sm:text-lg uppercase mt-1 text-[var(--c-text)]">BTP en Informática</h4>
                      <p className="font-semibold text-[10px] sm:text-xs mt-1 text-[var(--c-text-muted)]">
                        Formación técnica de base sobre mantenimiento de hardware de computadoras, soporte de sistemas operativos, diseño inicial de bases de datos relacionales y cableado estructurado para redes locales LAN.
                      </p>
                    </div>

                    <div className="border-3 border-[var(--c-border)] p-3 sm:p-4 bg-[var(--c-surface-hover)] relative shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)]">
                      <div className="absolute top-2 right-2 flex items-center gap-1 text-neo-pink font-mono text-[9px] font-bold">
                        <Award size={10} /> Autodidacta
                      </div>
                      <span className="font-mono text-xs font-bold text-neo-pink uppercase">Especialización Continua</span>
                      <h4 className="font-display font-black text-base sm:text-lg uppercase mt-1 text-[var(--c-text)]">Desarrollo Full Stack & Cloud</h4>
                      <p className="font-semibold text-[10px] sm:text-xs mt-1 text-[var(--c-text-muted)]">
                        Especialización avanzada e independiente en el despliegue de arquitecturas en la periferia de la red (Edge Computing), optimización SEO de nivel técnico, virtualización y orquestación mediante Docker, y despliegue robusto sobre servidores Linux VPS administrados manualmente.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* FOCO CARD EXPANSION */}
              {expandedCard === "foco" && (
                <div className="space-y-4 sm:space-y-5">
                  <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[var(--c-text)]">Foco Profesional</h3>

                  <div className="space-y-4 font-sans text-xs sm:text-sm text-[var(--c-text)] font-semibold leading-relaxed">
                    <p>
                      Mi enfoque profesional principal consiste en diseñar e implementar arquitecturas sólidas y escalables que unifiquen la lógica de negocio con la excelencia visual interactiva en el navegador. Me apasiona el desarrollo Full Stack moderno, la automatización inteligente mediante Inteligencia Artificial y la optimización extrema del rendimiento para garantizar tiempos de respuesta mínimos.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                      <div className="border-2 border-[var(--c-border)] p-3 bg-[var(--c-surface-hover)]">
                        <span className="font-display font-black text-xs uppercase text-neo-pink block">Tecnologías Preferidas</span>
                        <span className="font-sans text-[10px] sm:text-[11px] text-[var(--c-text-muted)] block mt-1 font-bold">
                          React, Next.js, TypeScript, Node.js, Python, Supabase, Cloudflare Workers, Neon DB.
                        </span>
                      </div>
                      <div className="border-2 border-[var(--c-border)] p-3 bg-[var(--c-surface-hover)]">
                        <span className="font-display font-black text-xs uppercase text-neo-cyan block">Ruta de Evolución</span>
                        <span className="font-sans text-[10px] sm:text-[11px] text-[var(--c-text-muted)] block mt-1 font-bold">
                          Integración de streaming de audio interactivo bidireccional en tiempo real, pipelines seguros de IA (Generative AI) y orquestación de bases de datos serverless distribuidas.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PROJECT DETAIL EXPANSION */}
              {typeof expandedCard === "object" && expandedCard !== null && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight leading-none text-[var(--c-text)]">
                      {expandedCard.title}
                    </h3>
                    <span className={`px-2 py-0.5 border-2 border-black font-display font-black text-[8px] sm:text-[9px] uppercase tracking-wider ${getProjectStatusColor(expandedCard.status)} shadow-[1px_1px_0px_0px_#000] select-none`}>
                      {expandedCard.status}
                    </span>
                  </div>

                  <div className="space-y-4 font-sans text-xs sm:text-sm text-[var(--c-text)]">

                    {/* Problem Section */}
                    <div className="border-4 border-[var(--c-border)] p-3 sm:p-4 bg-[var(--c-surface-hover)]">
                      <span className="font-display font-black text-xs uppercase text-neo-pink block mb-1">
                        El Problema de Negocio
                      </span>
                      <p className="font-semibold text-[var(--c-text)] leading-relaxed text-[10px] sm:text-xs">
                        {expandedCard.problem}
                      </p>
                    </div>

                    {/* Description */}
                    <div>
                      <span className="font-display font-black text-xs uppercase block mb-1 text-[var(--c-text)]">
                        Descripción General
                      </span>
                      <p className="font-medium leading-relaxed text-[var(--c-text)]">
                        {expandedCard.longDesc}
                      </p>
                    </div>

                    {/* Features List */}
                    <div>
                      <span className="font-display font-black text-xs uppercase block mb-2 text-[var(--c-text)]">
                        Funcionalidades Clave
                      </span>
                      <ul className="list-disc pl-5 space-y-1 text-[10px] sm:text-xs font-semibold text-[var(--c-text)]">
                        {expandedCard.features.map((feat, idx) => (
                          <li key={idx}>{feat}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Process timeline */}
                    <div>
                      <span className="font-display font-black text-xs uppercase block mb-2 text-[var(--c-text)]">
                        Proceso de Desarrollo
                      </span>
                      <div className="flex flex-col gap-2 font-mono text-[10px] sm:text-[11px]">
                        {expandedCard.process.map((step, idx) => (
                          <div key={idx} className="flex gap-2 items-start">
                            <span className="text-neo-cyan font-bold">{idx + 1}.</span>
                            <span className="font-sans font-bold text-[var(--c-text-muted)]">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Challenge & Solution */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t-2 border-[var(--c-border)] pt-4 mt-2">
                      <div className="p-3 border-2 border-[var(--c-border)] bg-[var(--c-surface-hover)]">
                        <span className="font-display font-black text-xs uppercase text-neo-pink block">El Reto</span>
                        <p className="font-sans text-[10px] sm:text-[11px] text-[var(--c-text-muted)] font-bold block mt-1 leading-snug">
                          {expandedCard.challenge}
                        </p>
                      </div>
                      <div className="p-3 border-2 border-[var(--c-border)] bg-[var(--c-surface-hover)]">
                        <span className="font-display font-black text-xs uppercase text-neo-green block">La Solución</span>
                        <p className="font-sans text-[10px] sm:text-[11px] text-[var(--c-text-muted)] font-bold block mt-1 leading-snug">
                          {expandedCard.solution}
                        </p>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <span className="font-display font-black text-xs uppercase block mb-2 text-[var(--c-text)]">
                        Tecnologías Utilizadas
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {expandedCard.tags.map((tag, idx) => (
                          <span key={idx} className="px-2.5 py-1 border-2 border-[var(--c-border)] bg-[var(--c-tag-bg)] font-mono text-[10px] sm:text-xs font-bold shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] text-[var(--c-text)]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Links */}
                  {expandedCard.status !== "Vendido" && (
                    <div className="mt-6 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-2 border-t-2 border-[var(--c-border)]">
                      {expandedCard.githubUrl && (
                        <a
                          href={expandedCard.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 border-3 border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-text)] font-display font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] inline-flex items-center justify-center gap-1.5"
                        >
                          Repositorio <GithubIcon className="h-4 w-4" />
                        </a>
                      )}
                      {expandedCard.status !== "Discontinuado" && expandedCard.status !== "Deprecado" && expandedCard.liveUrl && (
                        <a
                          href={expandedCard.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 border-3 border-[var(--c-border)] bg-neo-yellow text-black font-display font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] inline-flex items-center justify-center gap-1.5"
                        >
                          Demo en Vivo <ExternalLink size={14} className="stroke-[2.5]" />
                        </a>
                      )}
                    </div>
                  )}
                  {expandedCard.status === "Vendido" && (
                    <div className="mt-6 flex justify-end pt-2 border-t-2 border-[var(--c-border)]">
                      <span className="px-4 py-2 border-3 border-black bg-neo-cyan text-black font-display font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),1)] select-none">
                        Código Fuente Vendido (Propiedad Privada)
                      </span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ INTERACTIVE DIALOG MODALS ═══ */}
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
    </main>
  );
}

// Simple internal helper component to handle Escape key for the main bento dialog overlay
const ModalEscapeHandler = ({ onClose }: { onClose: () => void }) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return null;
};
