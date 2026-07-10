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
    default: "Jeremerc | Creative Developer & Freelancer",
    template: "%s | Jeremerc"
  },
  description: "Portafolio interactivo de proyectos freelancer y desarrollo web premium. Diseñado bajo estilo neobrutalista limpio, con consola interactiva y alto rendimiento.",
  keywords: [
    "freelance developer", 
    "desarrollo web premium", 
    "neobrutalism UI", 
    "bento grid portfolio",
    "React developer",
    "Next.js portfolio",
    "TypeScript engineer",
    "diseño interactivo"
  ],
  authors: [{ name: "Jeremy C.", url: "https://jeremerc.dev" }],
  creator: "Jeremy C.",
  publisher: "Jeremy C.",
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
    title: "Jeremerc | Creative Developer & Freelancer | Portafolio Interactivo",
    description: "Desarrollo de software y diseño premium interactivo. Explora mis proyectos freelancer con presupuestos adaptables y tiempos flexibles.",
    siteName: "Jeremerc.dev",
    images: [
      {
        url: "https://jeremerc.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jeremerc.dev Portafolio Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeremerc | Creative Developer & Freelancer",
    description: "Portafolio interactivo de proyectos de desarrollo web premium y diseño neobrutalista.",
    images: ["https://jeremerc.dev/og-image.png"],
    creator: "@jeremerc",
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
                "name": "Jeremy C.",
                "alternateName": "WriteColor",
                "url": "https://jeremerc.dev",
                "image": "https://jeremerc.dev/og-image.png",
                "jobTitle": "Full Stack Developer",
                "knowsAbout": [
                  "Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Supabase", "WebGL", "Framer Motion", "Docker"
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
      <body className="min-h-full flex flex-col bg-[var(--c-bg)] text-[var(--c-text)] selection:bg-neo-yellow selection:text-black transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
