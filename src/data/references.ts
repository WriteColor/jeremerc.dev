export interface Reference {
  author: string;
  role: string;
  company: string;
  text: string;
  project: string;
}

export const REFERENCES_DB: Reference[] = [
  {
    author: "Carlos Mendoza",
    role: "CTO",
    company: "AeroCargo Logística",
    text: "Trabajar con Jere fue clave para nuestro portal. Logró una adaptabilidad total ante cambios de última hora, entregando una plataforma ultra rápida con mapas interactivos en tiempo récord y sin comprometer la calidad del código.",
    project: "AeroCargo Portal"
  },
  {
    author: "Laura Prieto",
    role: "Frontend Lead",
    company: "Creative Labs",
    text: "Tiene un ojo crítico excelente para las interacciones visuales. Las animaciones físicas y de colisión elásticas que implementó para nuestra biblioteca superaron con creces lo que teníamos planeado. Su dominio de Framer Motion es de primer nivel.",
    project: "Neobrutal UI"
  },
  {
    author: "Martín Vega",
    role: "Lead Architect",
    company: "StitchHub",
    text: "Logró diseñar una interfaz de toma de medidas 2D tan intuitiva que nuestros usuarios sastres tradicionales la adoptaron sin fricciones. Integró Stripe y Twilio de forma impecable. Un código robusto y modular sobresaliente.",
    project: "StitchHub SaaS"
  },
  {
    author: "Sofía Altamirano",
    role: "Fundadora",
    company: "Studio Dither",
    text: "Mudar el procesamiento de imágenes pesado a shaders WebGL en GPU resolvió por completo los cuelgues del navegador. Jeremerc entregó un renderizador a 60fps constante. Altamente recomendado para proyectos interactivos avanzados.",
    project: "CyberDither"
  }
];
