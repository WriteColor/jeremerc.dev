# Portafolio Profesional Neobrutalista — Jeremerc.dev

Este repositorio contiene el código fuente de **Jeremerc.dev**, una aplicación web interactiva de alto rendimiento y arquitectura neobrutalista moderna desarrollada por **Jeremyah Mercado (WriteColor)**.

La aplicación está construida sobre **Next.js 16 (App Router)**, **React 19**, **TypeScript** y **Tailwind CSS v4**, y está optimizada de extremo a extremo para ofrecer una velocidad de carga ultrarrápida, tasas de refresco constantes (60+ FPS), puntuaciones superiores a 90-100 en Google PageSpeed Insights / Lighthouse y compatibilidad total con lectores de pantalla y agentes de Inteligencia Artificial (WebMCP / LLM agents).

---

## 🚀 Arquitectura y Tecnologías Principal

* **Framework Principal:** [Next.js 16.2.10](https://nextjs.org/) con compilador **Turbopack** para desarrollo y empaquetado de producción estático/dinámico.
* **Biblioteca de Interfaz:** [React 19.2.4](https://react.dev/) y **TypeScript 5.9** con componentes fuertemente tipados.
* **Estilos y Sistema de Diseño:** Tailwind CSS v4 (`@import "tailwindcss";`), respaldado por variables CSS dinámicas como única fuente de verdad para el cambio instantáneo de tema **Claro / Oscuro** sin parpadeos visuales (FOUT).
* **Iconografía Adaptativa & Tree-Shaking:** Importaciones nombradas y tipadas de [@dev.icons/react](https://devicons.io/) y [Lucide React](https://lucide.dev/), con soporte de inversión automática de contraste (`dark:invert`) para compatibilidad completa en ambos temas.
* **Base de Datos Serverless (Neon DB):** [Neon Serverless PostgreSQL](https://neon.tech/) para rate-limiting atómico distribuido y persistencia de estadísticas en tiempo real (visitas únicas, votos positivos/negativos).
* **Animaciones & Físicas:** [Framer Motion](https://www.framer.com/motion/) para transiciones de resorte (spring physics) y microinteracciones de interfaz.
* **Fondo Canvas 2D:** Renderizador `ShapeGrid` optimizado mediante RequestAnimationFrame (RAF), con detección de visibilidad de pestaña para pausar el bucle cuando la página se minimiza o pasa a segundo plano (ahorro de batería y CPU).
* **Protección Anti-Bots & Formularios:** [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) para la verificación transparente e invisible de usuarios humanos en el formulario de contacto.
* **Agentes de IA & SEO:** Metadatos enriquecidos OpenGraph / Twitter, datos estructurados JSON-LD (`ProfilePage`), ruta `sitemap.xml`, `robots.txt` y especificación nativa en `llms.txt`.

---

## 📂 Estructura del Directorio

```text
src/
├── app/
│   ├── api/
│   │   ├── contact/           # Endpoint del formulario de contacto protegido con Cloudflare Turnstile
│   │   ├── domains/           # Módulos del motor de búsqueda y verificación de dominios
│   │   │   ├── check/         # Endpoint de disponibilidad (DoH Cloudflare/Google, WHOIS sockets)
│   │   │   ├── info/          # Endpoint de detalles de registros WHOIS y valoración procedural
│   │   │   └── suggest/       # Endpoint de generación de sugerencias de nombres alternativos
│   │   └── stats/             # Persistencia de métricas (visitas únicas, votos me gusta / no me gusta)
│   ├── error-test/            # Sandbox para simulación de errores de API
│   ├── globals.css            # Estilos globales, variables de color neobrutalistas y utilidades de contraste
│   ├── layout.tsx             # Disposición raíz, metadatos SEO, script anti-flash de tema y datos JSON-LD
│   ├── page.tsx               # Bento Grid principal, control global de audios y coordinación de modales
│   ├── robots.ts              # Generador dinámico de robots.txt para buscadores y agentes
│   └── sitemap.ts             # Generador dinámico de mapa del sitio sitemap.xml
├── components/
│   ├── backgrounds/           # Fondos Canvas 2D interactivos (ShapeGridBackground.tsx, ShapeGrid.tsx)
│   ├── domains/               # Componentes del verificador de dominios (Bento, Tablas, Ficha Técnica)
│   ├── forms/                 # Formulario de contacto con Turnstile y feedback animado
│   ├── modals/                # Diálogos de proyectos, catálogo de habilidades, especificaciones y referencias
│   ├── terminal/              # Terminal CLI interactiva con comandos reales y autocompletado
│   └── ui/                    # Primitivas UI reutilizables (SkillIcons, DecayCard, CardSwap, PixelCard, LogoLoop, CountUp)
├── hooks/
│   └── useFocusTrap.ts        # Hook para captura y retención de foco de teclado (Accesibilidad WCAG 2.1 AA)
├── data/
│   ├── projects.ts            # Información estructurada de proyectos reales (Freelance, Vendidos, Fullstack, Frontend)
│   └── skills.ts              # Catálogo completo de tecnologías y niveles de dominio
├── utils/
│   ├── db.ts                  # Cliente de base de datos Neon PostgreSQL y operaciones KV
│   ├── rateLimit.ts           # Rate limiter atómico en PostgreSQL con fallback en memoria local
│   └── DomainCacheService.ts  # Servicio de caché en memoria de consultas de dominios
└── public/
    ├── avatar.webp            # Foto de perfil ultraligera (18.1 KB WebP)
    ├── og-image.png           # Imagen optimizada OpenGraph (108 KB)
    ├── llms.txt               # Documentación semántica para agentes de lenguaje e IA
    └── sounds/                # Efectos de sonido e hilo musical optimizados (preload="none")
```

---

## 🛠️ Funcionalidades Clave

### 1. Motor de Consulta y Verificación de Dominios en Tiempo Real
Un verificador integrado en la interfaz Bento Grid que implementa:
* **Estrategia de Triple Fallback:** Verificaciones secuenciales mediante DoH (DNS-over-HTTPS) utilizando servidores seguros de Cloudflare y Google, sockets directos WHOIS TCP y APIs web.
* **Valoración Procedural:** Algoritmo backend que asigna un valor estimado basado en longitud, palabras clave, memorabilidad y extensión TLD.
* **Caché Eficiente:** Almacenamiento temporal de resultados en `DomainCacheService.ts` para minimizar latencias de red.

### 2. Terminal CLI Interactiva
Ubicada en la tarjeta del perfil, esta consola ofrece comandos reales:
* `help`: Muestra la lista de comandos disponibles.
* `skills`: Muestra habilidades y permite autocompletado con la tecla Tab (`skills <Nombre>`).
* `cat`: Abre y visualiza el código real de archivos de configuración (`package.json`, `tsconfig.json`, `next.config.ts`, `globals.css`).
* `neofetch`: Muestra especificaciones de sistema en estilo retro.
* `clear`: Limpia el historial de la pantalla.
* **Físicas y Sonido:** Sacudidas visuales (`shake`), sonido de error y retroalimentación dinámica ante comandos inexistentes.

### 3. Pautas de Accesibilidad (WCAG 2.1 AA) & AI Agent Optimization
* **Focus Trap:** Retención estricta del foco dentro del modal activo mediante `useFocusTrap`.
* **Soporte Marquee / LogoLoop:** Clonado seguro de elementos en contenedores `aria-hidden="true"` especificando `tabIndex={-1}` para evitar elementos enfocables invisibles.
* **Alto Contraste:** Textos y etiquetas ajustadas para superar el ratio de contraste de 4.5:1 en temas claro y oscuro.
* **Estructura para Agentes de IA:** Soporte para WebMCP, metadatos OpenAPI/LLM en `llms.txt` y mapa del sitio `sitemap.xml`.

### 4. Sincronización de Audio & Mute Control
* Sonidos de interfaz (`click.wav`, `swipe.wav`, `error.wav`) y música de fondo (`ambient.mp3`) con política `preload="none"`.
* Desbloqueo automático del AudioContext en la primera interacción o clic del usuario.
* Controles independientes para silenciar/activar música y efectos SFX.

---

## 🛠️ Configuración y Desarrollo Local

1. Instala las dependencias del proyecto:
   ```bash
   pnpm install
   ```
2. Ejecuta el servidor de desarrollo local con Turbopack:
   ```bash
   pnpm dev
   ```
3. Compila el paquete de producción optimizado:
   ```bash
   pnpm build
   ```
4. Inicia el servidor compilado de producción:
   ```bash
   pnpm start
   ```

---

## ☁️ Variables de Entorno (.env)

Crea un archivo `.env` en la raíz del proyecto configurando tus llaves:

```env
# Neon Serverless PostgreSQL Database URL
DATABASE_URL=postgresql://user:pass@ep-host.aws.neon.tech/dbname

# Cloudflare Turnstile Bot Protection
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
```
