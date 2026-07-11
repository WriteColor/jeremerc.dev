# JereMerc.dev — Portafolio Profesional Neobrutalista

Este es el repositorio oficial del portafolio personal de **Jeremyah ("JereMerc")**, diseñado bajo una estética Neobrutalista premium e implementado utilizando **Next.js 16 (App Router)**, **TypeScript**, y **Tailwind CSS** para ofrecer un diseño fluido, responsivo y de alto rendimiento.

---

## 🚀 Arquitectura y Tecnologías

El portafolio está estructurado para maximizar el rendimiento visual, la interactividad y la velocidad de carga (Locked 60+ FPS):
*   **Framework Principal:** [Next.js 16.2.10](https://nextjs.org/) (utilizando Turbopack para optimización de desarrollo y compilación rápida).
*   **Base de Datos (Neon DB):** [Neon Serverless PostgreSQL](https://neon.tech/) para rate-limiting distribuido, registro seguro de formularios y persistencia de métricas en tiempo real.
*   **Estilos y CSS:** Tailwind CSS y variables dinámicas neobrutalistas para soporte de temas Claro/Oscuro instantáneo.
*   **Iconografía (Devicon + SVG):** Integración con [Devicon CDN](https://devicons.io/) para iconos de tecnología oficiales coloridos, con fallbacks de SVGs personalizados en código.
*   **Motor 3D y Canvas:** [OGL](https://github.com/o-g-l/ogl) para el fondo fluido y canvas interactivos optimizados mediante cacheado de dimensiones del DOM.

---

## 📂 Organización del Proyecto

El código está estructurado de manera profesional, limpia y modular:

```text
src/
├── app/
│   ├── api/
│   │   ├── contact/           # Endpoint SMTP Zoho para envío de correos con Turnstile
│   │   └── stats/             # Endpoint Neon DB para visitas, likes y dislikes
│   ├── error-test/            # Sandbox para simulación de errores HTTP
│   ├── globals.css            # Estilos globales y tokens neobrutalistas
│   ├── layout.tsx             # Layout base, SEO metadatos y CDN de Devicon
│   └── page.tsx               # Grilla Bento principal y control de modales
├── components/
│   ├── backgrounds/           # Fondos interactivos (ShapeGrid, Fluid)
│   ├── forms/                 # Formulario de contacto
│   ├── modals/                # Diálogos de habilidades, dominios y opiniones
│   ├── terminal/              # Widget de terminal interactiva con autocompletado TAB
│   └── ui/                    # Componentes UI (CardSwap por GPU CSS, PixelCard, DecayCard)
├── utils/
│   ├── db.ts                  # Gestor del cliente Neon DB y métodos de lectura/escritura KV
│   └── rateLimit.ts           # Rate Limiter distribuido en Neon DB con fallback en memoria
```

---

## 🛠️ Funcionalidades Clave

### 1. Terminal Interactiva con Autocompletado TAB
Ubicada en la tarjeta de perfil, esta consola ofrece comandos interactivos reales:
*   `help`: Muestra la lista de comandos disponibles.
*   `skills`: Muestra la lista completa de habilidades y tecnologías. Puedes autocompletar con `skills <Nombre Habilidad>` usando Tab.
*   `cat`: Abre y visualiza el código real de configuración del proyecto (`package.json`, `tsconfig.json`, `next.config.ts` o `globals.css`). Autocompleta los nombres de archivo presionando Tab.
*   `neofetch`: Muestra especificaciones de sistema retro neobrutalistas.
*   `clear`: Limpia el historial de comandos de la consola.
*   **Efectos Físicos:** El terminal reacciona con sacudidas (`shake`) al ingresar comandos inexistentes y cambia el color del borde de forma dinámica.

### 2. Formulario de Contacto Seguro (Zoho SMTP + Cloudflare Turnstile)
*   El formulario realiza el despacho de correos usando Zoho SMTP (`smtp.zoho.com`).
*   Envía una copia del mensaje del usuario a `contacto@jeremerc.dev` y una confirmación directa al correo del remitente utilizando una plantilla de diseño HTML neobrutalista personalizada.
*   **Protección Anti-Abuso:** Integra **Cloudflare Turnstile** para verificar la validez del token en el servidor mediante la API oficial `siteverify` antes de despachar cualquier correo.

### 3. Sistema de Rate Limiting (Límite de Tráfico)
Para evitar el abuso en el envío de correos y votaciones, la utilidad `rateLimit.ts` detecta si está en producción y se comunica de forma atómica con la base de datos Neon DB. Si no detecta la base de datos, conmuta automáticamente a un caché local en memoria (`Map`) con limpieza activa de registros expirados.

### 4. Métricas de Feedback en el Footer
*   Lleva registro de visitas únicas totales y contador de Likes/Dislikes persistidos en la base de datos.
*   Excluye del conteo a rastreadores automatizados de IA, indexadores y motores de búsqueda mediante expresiones regulares del `User-Agent`.

---

## 💾 Estructura del Modelo de Base de Datos (PostgreSQL)

El proyecto utiliza Neon PostgreSQL para persistencia de datos y estadísticas:

*   **`kv_cache`**: Almacena contadores clave del sitio web en formato clave-valor (p. ej., `stats:visits`, `stats:likes`, `stats:dislikes`).
*   **`contact_logs`**: Guarda un registro histórico de los mensajes enviados a través del formulario de contacto para auditorías de soporte.
*   **`rate_limits`**: Gestiona las restricciones de IP y conteo de peticiones para mitigar ataques DDoS o spam.

---

## 🛠️ Desarrollo Local

1. Instala las dependencias necesarias:
   ```bash
   pnpm install
   ```
2. Ejecuta el servidor de desarrollo:
   ```bash
   pnpm dev
   ```
3. Realiza la construcción para producción:
   ```bash
   pnpm build
   ```
4. Arranca la compilación de producción:
   ```bash
   pnpm start
   ```

---

## ☁️ Variables de Entorno (.env)

Crea un archivo `.env` en la raíz del proyecto configurando tus variables:
*   `DATABASE_URL`: URL de conexión directa de Neon PostgreSQL (ej: `postgresql://user:pass@ep-host.aws.neon.tech/dbname`).
*   `SMTP_HOST`: Host SMTP de Zoho (`smtp.zoho.com`).
*   `SMTP_PORT`: Puerto seguro (`465`).
*   `SMTP_USER` / `SMTP_PASS`: Cuenta y credenciales de envío del correo.
*   `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY`: Par de llaves de Cloudflare Turnstile para protección de bots.
