export interface DomainExtensionInfo {
  extension: string;
  firstYearPrice: number; // in EUR
  renewalPrice: number; // in EUR
  observations: string;
  category: "populares" | "economicos" | "tecnicos" | "locales" | "creativos";
  isBestValue?: boolean;
}

export const DOMAIN_EXTENSIONS: DomainExtensionInfo[] = [
  // Populares
  { extension: ".com", firstYearPrice: 6, renewalPrice: 15, observations: "El estándar de oro global.", category: "populares", isBestValue: true },
  { extension: ".net", firstYearPrice: 6, renewalPrice: 16, observations: "Ideal para redes e infraestructura.", category: "populares" },
  { extension: ".org", firstYearPrice: 6, renewalPrice: 17, observations: "Perfecto para organizaciones.", category: "populares" },
  
  // Locales
  { extension: ".es", firstYearPrice: 3, renewalPrice: 10, observations: "Esencial para el público en España.", category: "locales", isBestValue: true },
  { extension: ".com.es", firstYearPrice: 3, renewalPrice: 9, observations: "Alternativa económica local.", category: "locales" },
  { extension: ".org.es", firstYearPrice: 3, renewalPrice: 9, observations: "Para organizaciones españolas.", category: "locales" },
  { extension: ".nom.es", firstYearPrice: 3, renewalPrice: 9, observations: "Para portafolios personales.", category: "locales" },
  { extension: ".lat", firstYearPrice: 3, renewalPrice: 12, observations: "Ideal para América Latina.", category: "locales" },

  // Economicos
  { extension: ".online", firstYearPrice: 3, renewalPrice: 32, observations: "Presencia en línea inmediata.", category: "economicos" },
  { extension: ".xyz", firstYearPrice: 3, renewalPrice: 14, observations: "Moderno y altamente popular.", category: "economicos" },
  { extension: ".shop", firstYearPrice: 3, renewalPrice: 30, observations: "Para tiendas virtuales.", category: "economicos" },
  { extension: ".wiki", firstYearPrice: 3, renewalPrice: 19, observations: "Para bases de conocimiento.", category: "economicos" },
  { extension: ".store", firstYearPrice: 4, renewalPrice: 35, observations: "Perfecto para e-commerce.", category: "economicos" },
  { extension: ".blog", firstYearPrice: 4, renewalPrice: 22, observations: "Excelente para publicaciones.", category: "economicos" },
  { extension: ".mom", firstYearPrice: 3, renewalPrice: 20, observations: "Para blogs familiares.", category: "economicos" },
  { extension: ".help", firstYearPrice: 3, renewalPrice: 28, observations: "Sitios de soporte y ayuda.", category: "economicos" },
  { extension: ".quest", firstYearPrice: 3, renewalPrice: 15, observations: "Portales de aventuras o retos.", category: "economicos" },
  { extension: ".homes", firstYearPrice: 3, renewalPrice: 30, observations: "Bienes raíces e inmobiliario.", category: "economicos" },
  { extension: ".autos", firstYearPrice: 3, renewalPrice: 25, observations: "Para el sector automotriz.", category: "economicos" },

  // Tecnicos / SaaS
  { extension: ".cloud", firstYearPrice: 5, renewalPrice: 18, observations: "Ideal para SaaS y servicios en la nube.", category: "tecnicos", isBestValue: true },
  { extension: ".pro", firstYearPrice: 5, renewalPrice: 16, observations: "Para profesionales calificados.", category: "tecnicos" },
  { extension: ".info", firstYearPrice: 5, renewalPrice: 15, observations: "Portales informativos globales.", category: "tecnicos" },
  { extension: ".tech", firstYearPrice: 8, renewalPrice: 38, observations: "Enfoque puramente tecnológico.", category: "tecnicos" },
  { extension: ".dev", firstYearPrice: 10, renewalPrice: 15, observations: "El preferido por desarrolladores.", category: "tecnicos", isBestValue: true },
  { extension: ".app", firstYearPrice: 10, renewalPrice: 15, observations: "Diseñado para aplicaciones.", category: "tecnicos" },
  { extension: ".ing", firstYearPrice: 12, renewalPrice: 20, observations: "Llamativo para marcas en inglés.", category: "tecnicos" },
  { extension: ".lk", firstYearPrice: 12, renewalPrice: 25, observations: "Uso específico o especializado.", category: "tecnicos" },

  // Creativos / Negocios
  { extension: ".club", firstYearPrice: 6, renewalPrice: 14, observations: "Para comunidades y agrupaciones.", category: "creativos" },
  { extension: ".art", firstYearPrice: 5, renewalPrice: 13, observations: "Para diseñadores y artistas.", category: "creativos" },
  { extension: ".biz", firstYearPrice: 8, renewalPrice: 18, observations: "Alternativa para empresas.", category: "creativos" },
  { extension: ".one", firstYearPrice: 8, renewalPrice: 14, observations: "Simple, corto y recordable.", category: "creativos" },
  { extension: ".love", firstYearPrice: 10, renewalPrice: 25, observations: "Temático y emocional.", category: "creativos" },
  { extension: ".design", firstYearPrice: 13, renewalPrice: 42, observations: "Excelente para agencias creativas.", category: "creativos" },
  { extension: ".studio", firstYearPrice: 14, renewalPrice: 35, observations: "Estudios de diseño o software.", category: "creativos" }
];
