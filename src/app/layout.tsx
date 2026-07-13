import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jeremerc.dev"),
  title: {
    default: "Jeremerc.dev | Fullstack Developer, IA & Ciencia de Datos Freelancer",
    template: "%s | Jeremerc.dev"
  },
  description: "Portafolio interactivo de Jeremyh Mercado (WriteColor). Especialización en desarrollo de software Full Stack (Next.js, Node.js, Laravel), integraciones de Inteligencia Artificial, Ciencia de Datos, WebGL y despliegues en la nube. Explora proyectos premium de alto rendimiento con diseño neobrutalista.",
  keywords: [
    "Jeremerc", 
    "Jeremyh Mercado", 
    "WriteColor", 
    "freelance developer", 
    "desarrollo web premium", 
    "neobrutalism UI", 
    "bento grid portfolio",
    "React developer", 
    "Next.js portfolio", 
    "TypeScript engineer", 
    "diseño interactivo",
    "Inteligencia Artificial",
    "Ciencia de Datos",
    "Machine Learning",
    "Python Developer",
    "Node.js Backend",
    "Laravel PHP",
    "Neon PostgreSQL",
    "Supabase Serverless",
    "Docker Cloud Deploy",
    "WebGL Shaders 3D",
    "Framer Motion animations",
    "Cloudflare Workers Edge",
    "SaaS architecture"
  ],
  authors: [{ name: "Jeremyah Mercado", url: "https://jeremerc.dev" }],
  creator: "Jeremyh Mercado",
  publisher: "Jeremyah Mercado",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_LA",
    url: "https://jeremerc.dev",
    title: "Jeremerc.dev | Fullstack Developer, IA & Ciencia de Datos | Portafolio Interactivo",
    description: "Desarrollo de software y diseño interactivo premium. Explora proyectos freelancer en Next.js, APIs de Inteligencia Artificial, Ciencia de Datos, shaders WebGL y servidores Docker, con presupuestos adaptables y tiempos flexibles.",
    siteName: "Jeremerc.dev",
    images: [
      {
        url: "https://jeremerc.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jeremerc.dev - Fullstack Developer & IA Engineer Portfolio Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeremerc.dev | Fullstack Developer, IA & Ciencia de Datos",
    description: "Portafolio interactivo de proyectos de desarrollo web, IA, ciencia de datos y diseño neobrutalista premium con OGL 3D y BaseUI.",
    images: ["https://jeremerc.dev/og-image.png"],
    creator: "@WriteColor",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" }
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        {/* Inline script to set theme class before paint to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var t = localStorage.getItem('theme');
              if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              }
            } catch(e) {}
          })();
        `}} />
        {/* JSON-LD Professional Profile Structured Data for SEO optimization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "mainEntity": {
                "@type": "Person",
                "name": "Jeremyh Mercado",
                "alternateName": "WriteColor",
                "url": "https://jeremerc.dev",
                "image": "https://jeremerc.dev/og-image.png",
                "jobTitle": "Full Stack & AI Developer",
                "knowsAbout": [
                  "Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "Node.js", "Laravel", "PHP",
                  "Python", "C++", "Java", "Supabase", "Neon DB", "PostgreSQL", "WebGL", "Three.js", "Framer Motion",
                  "Docker", "Cloudflare Workers", "Git", "Inteligencia Artificial", "Ciencia de Datos", "Machine Learning",
                  "SaaS Architecture", "Software Engineering"
                ],
                "sameAs": [
                  "https://github.com/WriteColor",
                  "https://www.instagram.com/m.jere_echev/"
                ]
              }
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-(--c-bg) text-(--c-text) selection:bg-neo-yellow selection:text-black transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
