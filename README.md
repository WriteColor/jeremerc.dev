# Portafolio Profesional Neobrutalista

Este repositorio contiene el código fuente de un portafolio web interactivo de alto rendimiento desarrollado bajo una estética de diseño **Neobrutalista**. El proyecto está implementado utilizando **Next.js 16 (App Router)**, **TypeScript** y **Tailwind CSS**, y está diseñado para cargarse de forma fluida y responsiva garantizando compatibilidad total con dispositivos de diversas gamas.

---

## 🚀 Arquitectura y Tecnologías

El proyecto está optimizado a nivel de servidor y cliente para asegurar una tasa de refresco constante (60+ FPS) y baja latencia de carga:
* **Framework Principal:** [Next.js 16.2.10](https://nextjs.org/) con compilador Turbopack para optimizar los tiempos de desarrollo y empaquetado de producción.
* **Estilos y Maquetación:** Tailwind CSS v4, estructurado mediante variables dinámicas que actúan como única fuente de verdad para el soporte nativo e instantáneo de temas Claro y Oscuro.
* **Base de Datos (Neon DB):** [Neon Serverless PostgreSQL](https://neon.tech/) para rate-limiting atómico distribuido y persistencia de métricas en tiempo real.
* **Componentes Creativos y Animaciones:** [Framer Motion](https://www.framer.com/motion/) para transiciones fluidas de resorte (spring physics) y microinteracciones de interfaz.
* **Gráficos 3D y Fondos:** Renderizadores acelerados por GPU y canvas interactivos optimizados mediante el cálculo diferido de dimensiones del DOM.
* **Iconografía Adaptativa:** Iconos cargados a través de Devicon CDN con fallbacks en formato SVG inline que respetan de forma dinámica los cambios de color del tema claro/oscuro del sistema.

---

## 📂 Estructura del Directorio

El proyecto sigue una estructura limpia, modular y orientada a componentes independientes:

```text
src/
├── app/
│   ├── api/
│   │   ├── contact/           # Envío de correos por SMTP protegido con Cloudflare Turnstile
│   │   ├── domains/           # Módulos del motor de búsqueda y verificación de dominios
│   │   │   ├── check/         # Endpoint de disponibilidad DoH, WHOIS TCP y fallbacks
│   │   │   ├── info/          # Endpoint de detalles de WHOIS y valoración procedural
│   │   │   └── suggest/       # Endpoint de generación de dominios alternativos sugeridos
│   │   └── stats/             # Persistencia de métricas (visitas, votos positivos/negativos)
│   ├── error-test/            # Sandbox para simulación de respuestas de error de la API
│   ├── globals.css            # Estilos globales, variables de color y layouts neobrutalistas
│   ├── layout.tsx             # Proveedor del tema, metadatos SEO y fuentes del sistema
│   └── page.tsx               # Bento Grid principal y control global de modales
├── components/
│   ├── backgrounds/           # Fondos vectoriales y fluidos interactivos
│   ├── domains/               # Componentes del motor de verificación (Bento, Resultados, Modal Detalles)
│   ├── forms/                 # Formulario de contacto
│   ├── modals/                # Diálogos de proyectos, especificaciones e información de tecnologías
│   ├── terminal/              # Terminal interactiva CLI con navegación jerárquica
│   └── ui/                    # Primitivas UI reutilizables (PixelCard, CountUp, etc.)
├── hooks/
│   └── useFocusTrap.ts        # Hook para captura y retención de foco en teclados (Accesibilidad)
├── data/
│   ├── projects.ts            # Datos estáticos e información técnica de proyectos reales
│   └── skills.ts              # Catálogo estructurado de tecnologías y niveles de dominio
└── utils/
    ├── db.ts                  # Cliente de base de datos Neon PostgreSQL y operaciones clave-valor
    └── rateLimit.ts           # Rate limiter atómico con fallback local en memoria
```

---

## 🛠️ Funcionalidades Clave

### 1. Motor de Consulta y Verificación de Dominios en Tiempo Real
Un sistema de búsqueda de dominios integrado en la interfaz Bento Grid que implementa:
* **Lógica de Consulta de Triple Fallback:** Realiza verificaciones de disponibilidad secuenciales mediante DoH (DNS-over-HTTPS) utilizando servidores seguros de Cloudflare y Google, conexiones TCP WHOIS directas en sockets de red (incluyendo servidores específicos como `.es` nic lookups) y WHOIS JSON Web APIs.
* **Ficha Técnica & Valoración Estimada:** Los dominios disponibles o registrados despliegan un botón de `[Ficha]` que muestra información detallada del WHOIS (servidores DNS, registrador, fechas clave) y una valoración comercial estimada calculada por el backend en base a factores léxicos y la extensión del dominio.
* **Control de Errores y Tooltips:** En caso de fallas de conexión o restricciones de red de la API, el sistema marca el dominio en estado inconcluso (`Error API`), desactivando la ficha detallada y mostrando una descripción explicativa para optimizar la experiencia de usuario.
* **Modal de Solicitud de Registro:** Integración para exportar dominios disponibles directamente a un modal de solicitud de cotización o pre-registro.
* **Optimización de Estado y Caching:** Los resultados se persisten temporalmente mediante un servicio de caché local (`DomainCacheService.ts`) para minimizar consultas innecesarias a APIs de red.

### 2. Terminal CLI Interactiva
Ubicada en la tarjeta del perfil, esta consola ofrece comandos interactivos reales:
* `help`: Muestra la lista de comandos disponibles.
* `skills`: Muestra habilidades y permite autocompletar con `skills <Nombre Habilidad>` usando la tecla Tab.
* `cat`: Abre y visualiza el código real de archivos críticos de configuración (`package.json`, `tsconfig.json`, `next.config.ts` o `globals.css`).
* `neofetch`: Muestra especificaciones de sistema en estilo retro.
* `clear`: Limpia el historial de comandos de la consola.
* **Efectos Físicos:** El terminal reacciona con sacudidas visuales (`shake`) y cambios dinámicos del borde cuando se introduce un comando inexistente.

### 3. Pautas de Accesibilidad (WCAG 2.1 AA)
* **Captura de Foco (Focus Trap):** Implementada mediante el hook `useFocusTrap` en todos los modales para obligar al cursor de teclado a ciclar estrictamente dentro del diálogo activo.
* **Escape Jerárquico:** El teclado responde a la tecla `Escape` cerrando capas de forma progresiva: en modales complejos como el catálogo de habilidades, el primer escape regresa a la lista global y el segundo cierra el diálogo.
* **Etiquetado Semántico:** Uso exhaustivo de roles `dialog`, etiquetas descriptivas `aria-labelledby`, `aria-modal="true"`, y nombres alternativos `aria-label` en botones compuestos únicamente por iconos.
* **Outlines y Movimiento Reducido:** Enfoque de alta visibilidad para navegación por teclado en `globals.css` y desactivación de animaciones para usuarios con la directiva de sistema `prefers-reduced-motion` activa.

### 4. Sincronización de Audio y Eventos
* **Retardo de Sonido:** Despacho de audio sincronizado con las transiciones visuales mediante retardos controlados (80ms para efectos de clic y 100ms para efectos de swipe lateral) para adaptarse al renderizado de Framer Motion.
* **Mute Control Limitado:** Restricción de los efectos de sonido estrictamente a la apertura/cierre de diálogos interactivos, eliminando interferencias de audio al presionar controles del sistema como selectores de tema o botones de silenciado de música de fondo.

### 5. Formulario de Contacto Seguro
* Despacha correos electrónicos directos utilizando SMTP seguro de Zoho.
* Envía confirmaciones con formato HTML adaptado al diseño de la página al remitente y alertas instantáneas al administrador.
* **Protección Anti-Abuso:** Integración nativa de Cloudflare Turnstile verificando el token de validación en la API oficial en el servidor antes de autorizar cualquier envío de correo.

---

## 📊 Estructura de Datos y Base de Datos (PostgreSQL)

La persistencia de estadísticas y rate limits atómicos se realiza sobre las siguientes tablas:
* **`kv_cache`**: Almacena contadores clave del sitio en formato clave-valor (p. ej., visitas, me gusta, no me gusta).
* **`contact_logs`**: Almacena el historial de consultas enviadas para auditorías de rendimiento y soporte del servidor de correo.
* **`rate_limits`**: Registra identificadores de red con marca de tiempo para prevenir ataques DDoS o spam.

---

## 🛠️ Configuración y Desarrollo Local

1. Instala las dependencias del proyecto:
   ```bash
   pnpm install
   ```
2. Ejecuta el servidor de desarrollo local:
   ```bash
   pnpm dev
   ```
3. Construye el paquete de producción optimizado:
   ```bash
   pnpm build
   ```
4. Inicia el servidor compilado:
   ```bash
   pnpm start
   ```

---

## ☁️ Variables de Entorno (.env)

Crea un archivo `.env` en la raíz del proyecto configurando tus variables:
* `DATABASE_URL`: URL de conexión directa de Neon PostgreSQL (ej: `postgresql://user:pass@ep-host.aws.neon.tech/dbname`).
* `SMTP_HOST`: Host SMTP de Zoho (`smtp.zoho.com`).
* `SMTP_PORT`: Puerto seguro (`465`).
* `SMTP_USER` / `SMTP_PASS`: Cuenta y credenciales de envío del correo.
* `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY`: Par de llaves de Cloudflare Turnstile para protección contra bots.
