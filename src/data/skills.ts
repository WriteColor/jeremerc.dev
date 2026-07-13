export interface SkillDetail {
  name: string;
  years: string;
  level: "Junior" | "Intermedio" | "Avanzado" | "Experto";
  enjoyment: number; // 1-5
  projectTypes: string[];
  favoriteFeatures: string[];
  strengths: string[];
  useCases: string[];
  featuredProject: string;
  description: string;
}

export const SKILLS_FRONT = [
  "React",
  "Next.js",
  "Astro",
  "Vite",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Shadcn/UI",
  "Radix UI",
  "Base UI",
  "Framer Motion",
  "Three.js",
  "React Bits"
];

export const SKILLS_BACK = [
  "Node.js",
  "Laravel (PHP)",
  "Python",
  "C++",
  "Java (Swing)",
  "Cargo.js",
  "Supabase",
  "Neon DB",
  "PostgreSQL",
  "Docker",
  "Cloudflare Workers",
  "Git"
];

export const SKILLS_DB: Record<string, SkillDetail> = {
  // Front-end
  "React": {
    name: "React",
    years: "3 años",
    level: "Experto",
    enjoyment: 5,
    projectTypes: ["Single Page Apps (SPA)", "Sitios Web Altamente Interactivos", "Dashboards Administrativos Complejos"],
    favoriteFeatures: ["Custom Hooks avanzados", "Concurrent Rendering y transiciones", "React Server Components (RSC)"],
    strengths: ["Arquitectura modular limpia y mantenible", "Optimización avanzada de ciclos de renderizado", "Manejo estructurado de estados reactivos complejos"],
    useCases: ["Lógica interactiva de tarjetas del Bento Grid", "Gestión de estados globales de modales y terminal interactiva", "Integración y control de animaciones aceleradas por hardware"],
    featuredProject: "Florecitas (Flower Garden)",
    description: "React es la piedra angular de mi desarrollo frontend, la cual domino para estructurar componentes altamente reutilizables. Lo utilizo en este portafolio para sincronizar de forma reactiva las preferencias de usuario, estados de interacción táctil y el comportamiento de la terminal interactiva, garantizando que cada renderizado sea óptimo, rápido y libre de bloqueos en el hilo principal."
  },
  "Next.js": {
    name: "Next.js",
    years: "2.5 años",
    level: "Experto",
    enjoyment: 5,
    projectTypes: ["Aplicaciones Web Full Stack de producción", "E-Commerce con pasarelas de pago", "Sitios Web corporativos optimizados para SEO"],
    favoriteFeatures: ["App Router & Server Actions asíncronas", "Optimización de imágenes y fuentes integrado", "Estrategias híbridas de renderizado (SSR, ISR, SSG)"],
    strengths: ["SEO técnico de nivel sobresaliente", "Estrategia eficiente de carga y streaming de datos", "Estructuración limpia de layouts anidados y layouts paralelos"],
    useCases: ["Arquitectura general y ruteo de este portafolio", "Integración de endpoints de API de contacto y analíticas", "Manejo de optimización de imágenes y prevención de Cumulative Layout Shift (CLS)"],
    featuredProject: "Shakai Store & Bot",
    description: "Next.js es mi framework web principal para construir aplicaciones escalables listas para producción. En este portafolio aprovecho su enrutamiento avanzado, su compilación con Turbopack y sus Serverless Route Handlers asíncronos para responder peticiones en milisegundos a nivel mundial, logrando que el sitio sea indexado de manera impecable por motores de búsqueda gracias a su soporte nativo para metadatos dinámicos y JSON-LD."
  },
  "Astro": {
    name: "Astro",
    years: "1.5 años",
    level: "Avanzado",
    enjoyment: 4.5,
    projectTypes: ["Sitios Web Estáticos ultra rápidos", "Blogs técnicos de alta escalabilidad", "Landing Pages de marketing optimizadas"],
    favoriteFeatures: ["Arquitectura de islas (Islands Architecture)", "Zero-JS por defecto en el cliente", "Soporte multi-framework (React, Svelte, Vue)"],
    strengths: ["Tiempos de carga de página instantáneos", "Consumo insignificante de memoria en cliente", "Puntuaciones perfectas de 100/100 en Google Lighthouse"],
    useCases: ["Sitios estáticos pesados con datos dinámicos diferidos", "Páginas promocionales que exigen SEO técnico impecable y velocidad extrema"],
    featuredProject: "Florecitas (Flower Garden)",
    description: "Astro es mi herramienta preferida cuando la velocidad y el SEO son los objetivos principales del negocio. Me permite crear interfaces renderizadas por completo en el servidor que diferir el JavaScript a demanda en componentes interactivos aislados. Esto reduce drásticamente los retrasos de interacción táctil en dispositivos móviles de gama baja al evitar la sobrecarga tradicional de hidratación de frameworks SPA."
  },
  "TypeScript": {
    name: "TypeScript",
    years: "2.5 años",
    level: "Experto",
    enjoyment: 5,
    projectTypes: ["Sistemas de Diseño empresasariales", "APIs corporativas tipadas estrictamente", "Motores gráficos y editores interactivos"],
    favoriteFeatures: ["Tipado genérico avanzado y condicional", "Discriminated Unions para control de flujo de datos", "Type mapping y narrowing estricto"],
    strengths: ["Prevención del 98% de errores en tiempo de ejecución", "Autodocumentación natural del código base", "Refactorizaciones masivas seguras y rápidas"],
    useCases: ["Definición de tipos e interfaces de proyectos y APIs", "Narrowing para gestión de modales genéricos del portafolio", "Tipado estricto del driver de la base de datos Neon DB"],
    featuredProject: "MIN — Asistente de IA",
    description: "TypeScript es indispensable en mi flujo de trabajo para garantizar la longevidad y el mantenimiento del software. Al estructurar tipados estrictos en todo el portafolio, evito comportamientos indefinidos de JavaScript (como el clásico 'cannot read property of undefined'). Permite además documentar de forma nativa la firma de las funciones de redimensionamiento táctil, bases de datos y la terminal asíncrona."
  },
  "Tailwind CSS": {
    name: "Tailwind CSS",
    years: "3 años",
    level: "Experto",
    enjoyment: 5,
    projectTypes: ["Sistemas de Diseño Neobrutalistas a medida", "Interfaces Web responsivas complejas", "Prototipado interactivo de alta velocidad"],
    favoriteFeatures: ["Arbitrary values y clases dinámicas ([...])", "Tailwind CSS v4 framework engine", "Clases utilitarias adaptativas y modificadores hover/active/focus"],
    strengths: ["Consistencia visual total mediante tokens de diseño", "Maquetación adaptativa extremadamente rápida", "Reducción drástica del bundle de CSS final en producción"],
    useCases: ["Estilos CSS globales del Bento Grid", "Variables personalizadas del tema para claro/oscuro", "Transiciones de escalado rígido en tarjetas y botones"],
    featuredProject: "Bee's Birthday Experience",
    description: "Tailwind CSS revolucionó la forma en que escribo estilos, permitiéndome diseñar interfaces premium directamente en el marcado JSX sin alternar archivos. Lo utilizo en este portafolio para coordinar los estilos neobrutalistas (sombras rígidas de alto contraste y bordes de 4px) de manera responsiva, utilizando variables de tema adaptativas que reaccionan de forma instantánea al cambio de tema claro/oscuro."
  },
  "Shadcn/UI": {
    name: "Shadcn/UI",
    years: "1.5 años",
    level: "Experto",
    enjoyment: 4.5,
    projectTypes: ["Dashboards corporativos y paneles SaaS", "Librerías internas de componentes de diseño", "Formularios complejos y modales accesibles"],
    favoriteFeatures: ["Componentes headless totalmente editables", "Instalación manual por copia y pega", "Perfecta integración con Tailwind CSS"],
    strengths: ["Soporte nativo para lectores de pantalla", "Navegación completa por teclado out-of-the-box", "Estilos CSS planos fácilmente sobreescribibles"],
    useCases: ["Componente accesible de diálogos y modales", "Selectores accesibles en formularios", "Gestores de pestañas del Bento Grid"],
    featuredProject: "MIN — Asistente de IA",
    description: "Shadcn/UI me permite acelerar el desarrollo frontend sin sacrificar la accesibilidad ni imponer restricciones visuales. Al darme acceso directo al código fuente de cada componente interactivo, pude adaptar sus estilos Radix UI originales a una estética neobrutalista personalizada con bordes marcados y sombras sin desenfoque, garantizando una excelente experiencia de usuario para personas que usan tecnologías de asistencia."
  },
  "Radix UI": {
    name: "Radix UI",
    years: "1.5 años",
    level: "Avanzado",
    enjoyment: 4.5,
    projectTypes: ["Sistemas de componentes altamente accesibles", "Interfaces corporativas que exigen cumplimiento ADA/WAI-ARIA"],
    favoriteFeatures: ["Componentes desprovistos de estilo (Headless)", "Manejo automático del foco de pantalla", "Polimorfismo avanzado mediante la directiva asChild"],
    strengths: ["Cumplimiento estricto del estándar WAI-ARIA", "Gestión inteligente y segura del foco al abrir modales", "Estilado flexible compatible con Vanilla CSS y CSS Modules"],
    useCases: ["Bases estructurales de modales y diálogos interactivos", "Estructura del menú flotante de la terminal"],
    featuredProject: "MIN — Asistente de IA",
    description: "Radix UI me proporciona las primitivas de interacción necesarias para construir componentes web interactivos profesionales. En este portafolio, la lógica de los modales detallados de habilidades y proyectos se apoya en Radix para bloquear el scroll de fondo de forma segura, atrapar el foco dentro del diálogo activo y permitir el cierre intuitivo mediante la tecla Escape, garantizando una experiencia interactiva intachable."
  },
  "Base UI": {
    name: "Base UI",
    years: "1 año",
    level: "Avanzado",
    enjoyment: 4.5,
    projectTypes: ["Aplicaciones Web interactivas de alto impacto", "Sistemas de diseño customizados", "Proyectos Next.js optimizados"],
    favoriteFeatures: ["Micro-interacciones y transiciones nativas", "Diseño totalmente sin estilos integrados (unstyled)", "Integración natural con Next.js y React 19"],
    strengths: ["Accesibilidad semántica out-of-the-box", "Estructura interna del DOM limpia y configurable", "Optimizado para la hidratación asíncrona de React"],
    useCases: ["Botones interactivos y controles personalizados del portafolio", "Selectores de categoría y tags de estado"],
    featuredProject: "MIN — Asistente de IA",
    description: "Base UI es una biblioteca de componentes sin estilos que utilizo para acelerar el desarrollo web robusto. Su enfoque se centra en dotar al HTML de interactividad semántica y accesibilidad avanzada, permitiéndome estilarlos al 100% mediante las clases utilitarias de Tailwind CSS para crear interfaces neobrutalistas a medida que son ligeras, rápidas y totalmente adaptables a móviles y escritorio."
  },
  "Framer Motion": {
    name: "Framer Motion",
    years: "2 años",
    level: "Avanzado",
    enjoyment: 5,
    projectTypes: ["Experiencias Web interactivas en 2D/3D", "Transiciones complejas de páginas", "Microinteracciones físicas elásticas"],
    favoriteFeatures: ["AnimatePresence para salidas de elementos de pantalla", "Layout animations aceleradas por GPU", "MotionValues reactivos al cursor en tiempo real"],
    strengths: ["Animaciones físicas basadas en resortes (springs)", "Interpolaciones fluidas de posiciones en layouts reactivos", "Gestión simplificada de animaciones de montaje"],
    useCases: ["Animación del Bento Grid al filtrar categorías", "Efecto elástico y centrado de los modales", "Transición y escalado al cambiar el tema claro/oscuro"],
    featuredProject: "Bee's Birthday Experience",
    description: "Framer Motion es el motor de animación que utilizo para dotar de vida a las interfaces de React. En este portafolio, optimizo su uso configurando animaciones de posición exclusivas (`layout=\"position\"`) para evitar recálculos de tamaño de caja del navegador. Utilizo físicas de resorte personalizadas para lograr microinteracciones elásticas que se sienten naturales y responden al instante a la interacción táctil del usuario."
  },
  "Three.js": {
    name: "Three.js",
    years: "1.5 años",
    level: "Intermedio",
    enjoyment: 5,
    projectTypes: ["Experiencias interactivas en 3D en navegador", "Visualizadores de productos acelerados por hardware", "Mini-juegos tridimensionales en web"],
    favoriteFeatures: ["Renderizadores WebGL y WebGPU de alto rendimiento", "Raycasting para detección de colisiones de puntero", "Cargadores optimizados de modelos 3D y texturas"],
    strengths: ["Cálculo tridimensional pesado delegado a la GPU", "Filtros de iluminación dinámica e interacciones físicas en tiempo real", "Soporte robusto para cámaras y sombreadores personalizados (sombreadores GLSL)"],
    useCases: ["Orb tridimensional interactivo para asistente", "Renderizado y selección de piezas en visualizador de modelos"],
    featuredProject: "3D Model Viewer",
    description: "Three.js es la biblioteca estándar para renderizar gráficos 3D en el navegador de manera interactiva. La utilizo para incorporar efectos interactivos profundos acelerados por hardware. Su integración me permite cargar y manipular mallas tridimensionales con materiales avanzados sin penalizar el hilo principal de procesamiento, abriendo un abanico infinito de posibilidades visuales premium en la web."
  },
  "React Bits": {
    name: "React Bits",
    years: "1 año",
    level: "Avanzado",
    enjoyment: 4.8,
    projectTypes: ["Sitios Web creativos e interactivos", "Landing Pages de agencias de diseño", "Efectos visuales y microinteracciones"],
    favoriteFeatures: ["Efectos tipográficos animados", "Cards interactivas con físicas de deformación", "Fondos de partículas adaptables en canvas"],
    strengths: ["Integración extremadamente veloz de animaciones creativas", "Excelente balance entre estética premium y peso de bundle", "Optimización de rendimiento en efectos gráficos interactivos"],
    useCases: ["Efectos tipográficos y transiciones del Bento Grid", "Detalles decorativos interactivos de tarjetas"],
    featuredProject: "Bee's Birthday Experience",
    description: "React Bits es mi colección de cabecera de componentes creativos animados. La empleo como recurso clave para añadir efectos visuales de alta fidelidad que elevan la sensación de producto premium. Al estar optimizados y contar con dependencias reducidas, me permiten introducir animaciones de texto y layouts flotantes de forma ágil, manteniendo la fluidez de interacción por encima de los 60 FPS."
  },
  "JavaScript": {
    name: "JavaScript",
    years: "4 años",
    level: "Experto",
    enjoyment: 5,
    projectTypes: ["Motores interactivos y Canvas 2D en navegador", "Sitios Web interactivos tradicionales", "Lógica de automatizaciones locales"],
    favoriteFeatures: ["Programación asíncrona mediante promesas y Async/Await", "Módulos de ES6 nativos y closures avanzadas", "Herencia por prototipos y manipulación avanzada de arreglos"],
    strengths: ["Comprensión profunda de Event Loop y micro-tareas", "Optimización avanzada de rendimiento y uso de memoria en navegador", "Manipulación directa y fluida del DOM sin librerías intermedias"],
    useCases: ["Lógica interactiva de las tarjetas interactivas del Bento", "Scripts de soporte y automatizaciones locales del portafolio", "Controladores nativos táctiles y del canvas en 2D"],
    featuredProject: "Florecitas (Flower Garden)",
    description: "JavaScript es el lenguaje nativo de la web sobre el cual he desarrollado toda mi experiencia técnica. Conozco en profundidad el funcionamiento interno del motor de JS (V8), lo que me permite escribir código eficiente que evita bloqueos visuales y fugas de memoria. Es el motor detrás de las animaciones personalizadas y gestos táctiles directos que optimizan este portafolio."
  },
  "Vite": {
    name: "Vite",
    years: "2 años",
    level: "Experto",
    enjoyment: 4.8,
    projectTypes: ["Prototipado interactivo de alta velocidad", "Single Page Applications (SPA) modernas", "Compiladores y empaquetadores de librerías de UI"],
    favoriteFeatures: ["Hot Module Replacement (HMR) basado en ESM nativo", "Pre-empaquetado rápido de dependencias con Esbuild", "Compatibilidad total y fluida con plugins de Rollup"],
    strengths: ["Configuración ágil y flexible del entorno de desarrollo", "Generación de bundles de producción limificados", "Tiempos de compilación locales extremadamente optimizados"],
    useCases: ["Entorno de desarrollo ágil de Florecitas", "Servidor de desarrollo y construcción de builds de frontend locales"],
    featuredProject: "Florecitas (Flower Garden)",
    description: "Vite es mi empaquetador frontend de elección por dejar atrás la lentitud de herramientas basadas en bundles pesados como Webpack. Aprovecha el soporte nativo de ES Modules en el navegador y el compilador Esbuild en Go para servir módulos al instante, acelerando de forma exponencial el bucle de desarrollo y garantizando builds de producción optimizados."
  },
  "Node.js": {
    name: "Node.js",
    years: "3 años",
    level: "Avanzado",
    enjoyment: 4,
    projectTypes: ["APIs RESTful y microservicios escalables", "Scripts de automatización y herramientas CLI locales", "Sistemas de comunicación bidireccional mediante WebSockets"],
    favoriteFeatures: ["Event Loop asíncrono no bloqueante", "FileSystem API asíncrona nativa", "Extenso ecosistema NPM para automatizaciones"],
    strengths: ["Alto rendimiento en operaciones I/O concurrentes", "Desarrollo rápido de bots y herramientas de control", "Facilidad de integración de librerías nativas C++"],
    useCases: ["Servicio de consultas RCON para administración de servidores", "Bot de Discord de Shakai para automatización de compras", "Servidor local y entorno de compilación de desarrollo"],
    featuredProject: "Minecraft Web Store",
    description: "Node.js es mi entorno de backend de cabecera para construir sistemas asíncronos y bots de alto tráfico. Domino la arquitectura de bucle de eventos para optimizar llamadas I/O pesadas, como operaciones con el sistema de archivos o conexiones de red recurrentes. Su flexibilidad me permite integrar de manera directa sistemas de automatización con bases de datos relacionales y pasarelas de pago externas."
  },
  "Supabase": {
    name: "Supabase",
    years: "2 años",
    level: "Avanzado",
    enjoyment: 5,
    projectTypes: ["Bases de datos relacionales serverless", "Sistemas de autenticación integrados", "Backend as a Service (BaaS) para startups"],
    favoriteFeatures: ["PostgreSQL autogestionado con extensiones habilitadas", "Autenticación OAuth2 integrada y Row Level Security (RLS)", "Suscripciones en tiempo real mediante PostgreSQL replication"],
    strengths: ["Tiempos de desarrollo e integración mínimos", "Seguridad a nivel de base de datos robusta mediante políticas SQL", "Infraestructura serverless autogestionada escalable"],
    useCases: ["Persistencia de órdenes y transacciones de clientes", "Autenticación OAuth2 de usuarios vinculada a Discord y Webhook logs"],
    featuredProject: "Shakai Store & Bot",
    description: "Supabase me proporciona toda la robustez de PostgreSQL de nivel empresarial con la flexibilidad de una arquitectura serverless en la nube. Lo utilizo en mis backend para configurar almacenamiento seguro de archivos (Storage), autenticación OAuth2 de usuarios y suscripciones en tiempo real para aplicaciones de chat o pasarelas de comercio electrónico asíncronas."
  },
  "PostgreSQL": {
    name: "PostgreSQL",
    years: "2.5 años",
    level: "Avanzado",
    enjoyment: 4,
    projectTypes: ["Bases de Datos relacionales complejas", "Modelado de datos financieros seguros", "SaaS multi-inquilino (multi-tenant)"],
    favoriteFeatures: ["Transacciones ACID estrictas", "Soporte excelente para índices JSONB rápidos", "Agregaciones avanzadas y Window Functions de SQL"],
    strengths: ["Garantía de integridad de datos y relaciones complejas", "Normalización estricta y optimización de consultas complejas", "Soporte maduro para copias de seguridad e integridad relacional"],
    useCases: ["Estructuración relacional de inventario y pedidos", "Historial de transacciones auditables del sistema"],
    featuredProject: "Minecraft Web Store",
    description: "PostgreSQL es mi motor de base de datos relacional estándar cuando la consistencia relacional y la integridad transaccional son críticas. Domino la normalización de esquemas, optimización de queries SQL mediante analizadores EXPLAIN, configuración de índices compuestos rápidos y el almacenamiento asimétrico en columnas JSONB para combinar flexibilidad NoSQL con la robustez relacional."
  },
  "Python": {
    name: "Python",
    years: "2.5 años",
    level: "Avanzado",
    enjoyment: 4,
    projectTypes: ["Asistentes e integraciones avanzadas de IA", "Scripts de automatización local y scrapers de datos", "APIs rápidas de procesamiento matemático"],
    favoriteFeatures: ["Lógica asíncrona asynco para comunicación bidireccional", "Ecosistema rico en librerías de IA y Audio (STT, TTS, VAD)", "Sintaxis limpia de legibilidad extrema"],
    strengths: ["Integración extremadamente ágil de APIs de modelos de lenguaje", "Facilidad de manipulación de flujos de audio y sockets asíncronos", "Entorno sandbox para ejecución segura de terminal"],
    useCases: ["Lógica principal y procesamiento de audio del asistente de IA", "Auditoría de comandos y validación de seguridad de la consola"],
    featuredProject: "MIN — Asistente de IA",
    description: "Python es mi lenguaje de cabecera para la integración de inteligencia artificial y la automatización de flujos de trabajo de audio. En mis proyectos, utilizo Python para orquestar la comunicación de baja latencia entre APIs de LLM y modelos locales de transcripción (STT) y generación de voz (TTS), procesando flujos de datos asíncronos para que la interacción por voz se sienta humana y fluida."
  },
  "C++": {
    name: "C++",
    years: "2 años",
    level: "Intermedio",
    enjoyment: 4.5,
    projectTypes: ["Estructuras de Datos y Algoritmia avanzada", "Interfaces Gráficas offline ligeras", "Cómputo en paralelo y optimización"],
    favoriteFeatures: ["Control y gestión de memoria manual explícito", "Uso de punteros, referencias y referencias rvalue", "Compilación y ejecución a velocidad de metal nativo"],
    strengths: ["Optimización extrema del rendimiento de CPU", "Prevención de memory leaks mediante RAII", "Comprensión profunda de la arquitectura de computadoras"],
    useCases: ["Proyectos universitarios y simuladores de algoritmia compleja", "Algoritmos optimizados para procesamiento de mallas 3D"],
    featuredProject: "3D Model Viewer",
    description: "C++ me ha otorgado un conocimiento riguroso de la gestión de memoria y el rendimiento del hardware a bajo nivel. A través de este lenguaje comprendo cómo el compilador traduce las abstracciones en código de máquina, lo que me capacita para diseñar estructuras de datos optimizadas, evitar overheads innecesarios de CPU y programar software robusto de alto rendimiento físico."
  },
  "Docker": {
    name: "Docker",
    years: "2 años",
    level: "Intermedio",
    enjoyment: 4,
    projectTypes: ["Contenedores aislados y reproducibles", "Orquestación de servicios en servidores locales", "Entornos locales idénticos a producción"],
    favoriteFeatures: ["Docker Compose para definición multi-servicio", "Imágenes Docker multi-stage ultraligeras", "Montajes de volúmenes persistentes y redes aisladas"],
    strengths: ["Aislamiento completo de dependencias de desarrollo", "Consistencia absoluta entre local, staging y producción", "Despliegues rápidos y limpios de bases de datos locales"],
    useCases: ["Containerización de base de datos relacional PostgreSQL", "Aislamiento y empaquetado del entorno de ejecución de APIs de node"],
    featuredProject: "Minecraft Web Store",
    description: "Docker es una herramienta clave en mi flujo de desarrollo para asegurar la consistencia y la portabilidad del software. Lo empleo para empaquetar mis bases de datos, microservicios y servidores de desarrollo en contenedores reproducibles. Esto elimina los conflictos de entorno, simplifica la configuración de nuevos colaboradores y asegura que las aplicaciones se comporten idénticamente en VPS Linux."
  },
  "Cloudflare Workers": {
    name: "Cloudflare Workers",
    years: "1.5 años",
    level: "Avanzado",
    enjoyment: 5,
    projectTypes: ["APIs distribuidas a nivel global", "Redireccionamiento inteligente y Middlewares", "Procesadores asíncronos y Webhooks serverless"],
    favoriteFeatures: ["Ejecución ultrarrápida basada en V8 Isolates", "Despliegue nativo de Hono framework", "Tiempos de cold-start nulos (0ms) a nivel global"],
    strengths: ["Latencia extremadamente baja al correr en el Edge de la red", "Escalabilidad global instantánea y coste mínimo", "Protección nativa contra ataques de denegación de servicio (DDoS)"],
    useCases: ["API backend estructurada para gestión de pedidos y licencias", "Enrutamiento y webhooks asíncronos con pasarelas de pago"],
    featuredProject: "Shakai Store & Bot",
    description: "Cloudflare Workers es la plataforma serverless que elijo cuando la latencia global es prioritaria. Al ejecutarse sobre V8 isolates en lugar de pesadas máquinas virtuales, elimina los arranques en frío, procesando payloads y enrutamientos web en milisegundos desde cualquier parte del mundo. Lo utilizo en mis APIs para ofrecer un backend ágil con un consumo de recursos mínimo."
  },
  "Git": {
    name: "Git",
    years: "4 años",
    level: "Avanzado",
    enjoyment: 4.5,
    projectTypes: ["Control de Versiones y colaboración en equipo", "Automatización de despliegues y Pipelines CI/CD"],
    favoriteFeatures: ["Rebase interactivo y squash de commits", "Git hooks automáticos locales (Husky/pre-commit)", "Uso de ramas modulares limpias (GitFlow/trunk-based)"],
    strengths: ["Resolución rápida y estructurada de conflictos de código", "Historial de commits limpio y auditable con Conventional Commits", "Integración natural con sistemas de nube e integraciones de CD"],
    useCases: ["Control de versiones del código fuente del portafolio", "Integración continua con el hosting automático del frontend"],
    featuredProject: "Shakai Store & Bot",
    description: "Git es indispensable para mantener el orden, la audibilidad y la colaboración en el código de mis proyectos. Sigo estrictamente la especificación de Conventional Commits para mantener un registro de cambios limpio, utilizando rebase interactivo para pulir el historial de commits antes de realizar integraciones y automatizar lanzamientos estables."
  },
  "Laravel (PHP)": {
    name: "Laravel (PHP)",
    years: "2 años",
    level: "Avanzado",
    enjoyment: 4,
    projectTypes: ["Sistemas administrativos empresariales", "APIs robustas de backend corporativas", "E-Commerce con integraciones complejas de pasarelas"],
    favoriteFeatures: ["Eloquent ORM para consultas intuitivas de SQL", "Livewire y Blade templates integrados", "Sistema robusto de colas, tareas y notificaciones asíncronas"],
    strengths: ["Estructuración limpia basada en MVC clásico", "Seguridad por defecto contra inyecciones SQL y ataques CSRF", "Ecosistema maduro y completo para desarrollo ágil"],
    useCases: ["APIs backend altamente estructuradas", "Paneles de administración centralizados para gestión de bases de datos"],
    featuredProject: "Minecraft Web Store",
    description: "Laravel es mi framework backend robusto de cabecera para construir aplicaciones con bases de datos relacionales SQL complejas. Su rica sintaxis y potentes herramientas nativas, como Eloquent ORM y el gestor asíncrono de colas, me permiten desarrollar backends estructurados rápidos, seguros y perfectamente protegidos contra vulnerabilidades de la web."
  },
  "Java (Swing)": {
    name: "Java (Swing)",
    years: "2 años",
    level: "Intermedio",
    enjoyment: 3.8,
    projectTypes: ["Software local multiplataforma para escritorio", "Sistemas de inventario y facturación locales", "Herramientas de escritorio utilitarias"],
    favoriteFeatures: ["Gestores de distribución nativos (GridBagLayout, Borderlayout)", "Programación orientada a eventos nativa de Java", "Componentes UI personalizables basados en clases Swing"],
    strengths: ["Multiplataforma garantizada con ejecución en JVM", "Conexión directa a base de datos JDBC multihilo segura", "Arquitectura clásica y robusta estructurada bajo patrón MVC"],
    useCases: ["Aplicaciones offline de administración y facturación locales", "Simuladores de lógica de negocios"],
    featuredProject: "Minecraft Web Store",
    description: "Java con Swing me ha dotado de la habilidad para construir utilidades y aplicaciones nativas de escritorio. Domino el control de interfaces guiadas por eventos, la concurrencia multihilo para procesos asíncronos que no bloqueen la GUI y la integración JDBC nativa, ofreciendo soluciones offline portables y seguras que corren en cualquier sistema operativo."
  },
  "Cargo.js": {
    name: "Cargo.js",
    years: "1.5 años",
    level: "Intermedio",
    enjoyment: 4,
    projectTypes: ["Web scrapers concurrentes rápidos", "Scripts asíncronos de descarga e importación de assets", "Automatizaciones y utilidades de terminal"],
    favoriteFeatures: ["Descargas paralelas simultáneas", "Estructuración ligera sin dependencias pesadas", "Stream pipelining nativo eficiente"],
    strengths: ["Procesamiento ágil y concurrente de flujos de datos", "Configuración sencilla y modular de flujos asíncronos", "Tiempos de ejecución reducidos en tareas por lotes de CLI"],
    useCases: ["Automatización asíncrona de descargas concurrentes de bots", "Scripts automatizados de carga masiva de assets multimedia"],
    featuredProject: "Shakai Store & Bot",
    description: "Cargo.js es una potente utilidad de automatización asíncrona en Javascript que utilizo para optimizar la descarga e importación de recursos multimedia en mis flujos locales. Facilita la creación de flujos concurrentes eficientes que aceleran la recolección de datos y la orquestación de recursos en herramientas asíncronas de backend."
  },
  "Neon DB": {
    name: "Neon DB",
    years: "1 año",
    level: "Avanzado",
    enjoyment: 4.8,
    projectTypes: ["KV Cache rápido para Edge Computing", "Registros e historial de logs serverless", "Bases de datos relacionales sin costos fijos"],
    favoriteFeatures: ["Autogestión de branches de PostgreSQL al vuelo", "Escalabilidad a cero automática para optimizar coste", "Neon Serverless Driver con conexiones por WebSocket"],
    strengths: ["Conexión SQL instantánea desde endpoints en la periferia", "Integración transparente de consultas relacionales en serverless", "Excelente rendimiento y baja latencia en peticiones asíncronas"],
    useCases: ["KV Cache persistente para lecturas rápidas de likes/visitas", "Auditoría en tiempo real y logs del formulario de contacto"],
    featuredProject: "Shakai Store & Bot",
    description: "Neon DB es el motor de base de datos relacional serverless que elegí para centralizar el almacenamiento asíncrono y los registros de auditoría de este portafolio. Al correr sobre una infraestructura distribuida compatible con Edge functions y soportar conexiones mediante WebSockets, Neon me permite procesar consultas SQL en milisegundos sin arranques en frío, optimizando los recursos gracias a su escalabilidad automática a cero."
  }
};
