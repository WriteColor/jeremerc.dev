export interface Project {
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

export const PROJECTS: Project[] = [
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
      "Desarrollo de la interfaz modular de escritorio en Tauri utilizando Next.js and React.",
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
    githubUrl: "https://github.com/WriteColor/3D-Model-Viewer",
    liveUrl: "https://3dviewer.write-color.cloud/",
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

export const getProjectStatusColor = (status: Project["status"]) => {
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
