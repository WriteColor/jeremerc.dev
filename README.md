# JereMerc.dev — Portafolio Profesional Neobrutalista

Este es el repositorio oficial del portafolio personal de **Jeremyah ("JereMerc")**, diseñado bajo una estética Neobrutalista e implementado utilizando **Next.js 16 (App Router)**, **TypeScript**, y **BaseUI** para componentes limpios de alto rendimiento.

## 🚀 Arquitectura y Tecnologías
- **Framework Principal:** [Next.js 16.2.10](https://nextjs.org/) (usando Turbopack para compilación de alta velocidad).
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) para tipado estático completo.
- **Gráficos e Interactividad:** [OGL](https://github.com/o-g-l/ogl) para el renderizado 3D de alto rendimiento en el fondo de fluido, y [Framer Motion](https://www.framer.com/motion/) para las animaciones y transiciones de Bento Grid.
- **Estilos:** Tailwind CSS y variables CSS dinámicas para soporte nativo e instantáneo de Temas Claro/Oscuro.
- **Persistencia Serverless:** Diseñado para funcionar en **Vercel Serverless Edge**. Se integra mediante REST API con **Vercel KV (Redis)** para registrar visitas y votos únicos en tiempo real de forma distribuida.

---

## 📂 Organización del Proyecto
El código del proyecto está estructurado de manera profesional y modular:

```text
src/
├── app/
│   ├── api/
│   │   ├── contact/           # Endpoint SMTP Zoho para envío de correos
│   │   └── stats/             # Endpoint Serverless para métricas (visitas, likes/dislikes)
│   ├── error-test/            # Sandbox para simulación de errores HTTP
│   ├── globals.css            # Hoja de estilos globales y tokens de diseño
│   ├── layout.tsx             # Proveedor del HTML base y layouts principales
│   └── page.tsx               # Grid del portafolio, estados de modales y lógica principal
├── components/
│   ├── backgrounds/           # Componentes visuales de fondo (Ferrofluid, ShapeGrid)
│   ├── forms/                 # Formulario de contacto
│   ├── modals/                # Diálogos interactivos (Specs, Dominios, Opiniones)
│   ├── terminal/              # Widget de terminal interactiva con shakes y autocompletado
│   └── ui/                    # Componentes UI reutilizables (CardSwap, PixelCard, DecayCard)
├── utils/
│   └── rateLimit.ts           # Utilidad de Rate Limiting (Vercel KV / In-memory Fallback)
```

---

## 🛠️ Funcionalidades Clave

### 1. Terminal Interactiva con Autocompletado TAB
Ubicada en la tarjeta de perfil, esta consola ofrece comandos interactivos reales:
- `help`: Muestra la lista de comandos disponibles.
- `skills`: Muestra la lista completa de habilidades y tecnologías. Puedes autocompletar con `skills <Nombre Habilidad>` usando Tab.
- `cat`: Abre y visualiza el código real de configuración del proyecto (`package.json`, `tsconfig.json`, `next.config.ts` o `globals.css`). Autocompleta los nombres de archivo presionando Tab.
- `neofetch`: Muestra especificaciones de sistema retro neobrutalistas.
- `clear`: Limpia el historial de comandos de la consola.
- **Efectos Físicos:** El terminal reacciona con sacudidas (`shake`) al ingresar comandos inexistentes y cambia el color del borde de forma dinámica.

### 2. Formulario de Contacto Seguro (Zoho SMTP + Cloudflare Turnstile)
- El formulario realiza el despacho de correos usando Zoho SMTP (`smtp.zoho.com`).
- Envía una copia del mensaje del usuario a `contacto@jeremerc.dev` y una confirmación directa al correo del remitente utilizando una plantilla de diseño HTML neobrutalista personalizada.
- **Protección Anti-Abuso:** Integra **Cloudflare Turnstile** para verificar la validez del token en el servidor mediante la API oficial `siteverify` antes de despachar cualquier correo.

### 3. Sistema de Rate Limiting (Límite de Tráfico)
Para evitar el abuso del envío de correos y votaciones:
- La utilidad `rateLimit.ts` detecta si está en producción con Vercel KV para centralizar el conteo de solicitudes por IP de manera distribuida.
- Si no detecta las variables de entorno de KV, conmuta automáticamente a un caché en memoria Map con limpieza activa de registros expirados.

### 4. Métricas de Feedback en el Footer
- Lleva registro de visitas únicas totales y contador de Likes/Dislikes persistidos en la base de datos distribuida Vercel KV.
- Excluye del conteo a rastreadores automatizados de IA, indexadores y motores de búsqueda mediante expresiones regulares del `User-Agent`.

---

## 📦 Instrucciones para Desarrollo Local

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

## ☁️ Variables de Entorno

Para activar las métricas, el limitador de tráfico distribuidos, la protección anti-bot y el envío de correos por Zoho, debes configurar un archivo local `.env` (basado en `.env.example`) y cargar las siguientes variables de entorno en tu panel de Vercel:

### 1. Configuración de Correo (SMTP Zoho)
- `SMTP_HOST`: Servidor SMTP saliente (ej: `smtp.zoho.com`).
- `SMTP_PORT`: Puerto SMTP (ej: `465` con SSL).
- `SMTP_USER`: Cuenta de correo de envío autorizada (ej: `no-reply@write-color.cloud`).
- `SMTP_PASS`: Contraseña de aplicación o cuenta del remitente.
- `CONTACT_EMAIL`: Correo de contacto personal al cual llegarán las copias de los mensajes (ej: `contacto@jeremerc.dev`).

### 2. Configuración de Seguridad (Cloudflare Turnstile)
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Clave pública del sitio Turnstile.
- `TURNSTILE_SECRET_KEY`: Clave secreta de validación del lado del servidor.

### 3. Persistencia de Métricas (Vercel KV)
- `KV_REST_API_URL`: Dirección de la base de datos Redis serverless en Vercel KV.
- `KV_REST_API_TOKEN`: Token de acceso API REST de Vercel KV.
