export interface DomainExtensionInfo {
  extension: string;
  firstYearPrice: number; // in USD
  renewalPrice: number; // in USD
  category: "populares" | "economicos" | "tecnicos" | "locales" | "creativos";
  isBestValue?: boolean;
}

export interface DomainResult {
  extension: string;
  isAvailable: boolean | "error" | "loading";
  firstYearPrice: number;
  renewalPrice: number;
  isBestValue?: boolean;
  domainName?: string;
}

export const DOMAIN_EXTENSIONS: DomainExtensionInfo[] = [
  // Populares
  { extension: ".com", firstYearPrice: 6, renewalPrice: 15, category: "populares", isBestValue: true },
  { extension: ".net", firstYearPrice: 6, renewalPrice: 16, category: "populares" },
  { extension: ".org", firstYearPrice: 6, renewalPrice: 17, category: "populares" },
  
  // Locales
  { extension: ".es", firstYearPrice: 3, renewalPrice: 10, category: "locales", isBestValue: true },
  { extension: ".com.es", firstYearPrice: 3, renewalPrice: 9, category: "locales" },
  { extension: ".org.es", firstYearPrice: 3, renewalPrice: 9, category: "locales" },
  { extension: ".nom.es", firstYearPrice: 3, renewalPrice: 9, category: "locales" },
  { extension: ".lat", firstYearPrice: 3, renewalPrice: 12, category: "locales" },

  // Economicos
  { extension: ".online", firstYearPrice: 3, renewalPrice: 32, category: "economicos" },
  { extension: ".xyz", firstYearPrice: 3, renewalPrice: 14, category: "economicos" },
  { extension: ".shop", firstYearPrice: 3, renewalPrice: 30, category: "economicos" },
  { extension: ".wiki", firstYearPrice: 3, renewalPrice: 19, category: "economicos" },
  { extension: ".store", firstYearPrice: 4, renewalPrice: 35, category: "economicos" },
  { extension: ".blog", firstYearPrice: 4, renewalPrice: 22, category: "economicos" },
  { extension: ".mom", firstYearPrice: 3, renewalPrice: 20, category: "economicos" },
  { extension: ".help", firstYearPrice: 3, renewalPrice: 28, category: "economicos" },
  { extension: ".quest", firstYearPrice: 3, renewalPrice: 15, category: "economicos" },
  { extension: ".homes", firstYearPrice: 3, renewalPrice: 30, category: "economicos" },
  { extension: ".autos", firstYearPrice: 3, renewalPrice: 25, category: "economicos" },

  // Tecnicos / SaaS
  { extension: ".cloud", firstYearPrice: 5, renewalPrice: 18, category: "tecnicos", isBestValue: true },
  { extension: ".pro", firstYearPrice: 5, renewalPrice: 16, category: "tecnicos" },
  { extension: ".info", firstYearPrice: 5, renewalPrice: 15, category: "tecnicos" },
  { extension: ".tech", firstYearPrice: 8, renewalPrice: 38, category: "tecnicos" },
  { extension: ".dev", firstYearPrice: 10, renewalPrice: 15, category: "tecnicos", isBestValue: true },
  { extension: ".app", firstYearPrice: 10, renewalPrice: 15, category: "tecnicos" },
  { extension: ".ing", firstYearPrice: 12, renewalPrice: 20, category: "tecnicos" },
  { extension: ".lk", firstYearPrice: 12, renewalPrice: 25, category: "tecnicos" },

  // Creativos / Negocios
  { extension: ".club", firstYearPrice: 6, renewalPrice: 14, category: "creativos" },
  { extension: ".art", firstYearPrice: 5, renewalPrice: 13, category: "creativos" },
  { extension: ".biz", firstYearPrice: 8, renewalPrice: 18, category: "creativos" },
  { extension: ".one", firstYearPrice: 8, renewalPrice: 14, category: "creativos" },
  { extension: ".love", firstYearPrice: 10, renewalPrice: 25, category: "creativos" },
  { extension: ".design", firstYearPrice: 13, renewalPrice: 42, category: "creativos" },
  { extension: ".studio", firstYearPrice: 14, renewalPrice: 35, category: "creativos" }
];

export interface DomainWhoisInfo {
  domain_name: string;
  registrar?: string;
  whois_server?: string;
  creation_date?: number; // unix timestamp
  expiration_date?: number; // unix timestamp
  updated_date?: number; // unix timestamp
  name_servers?: string[];
  dnssec?: string;
}

export interface DomainValuationInfo {
  domain: string;
  label: string;
  tld: string;
  estimate: {
    low: number;
    mid: number;
    high: number;
    currency: string;
  };
  confidence: number;
  factors: {
    length: number;
    tldTier: string;
    lettersOnly: boolean;
    isDictionaryWord: boolean;
    isBrandable: boolean;
  };
  comparables?: Array<{
    category: string;
    typical_range: { low: number; high: number };
    relevance: number;
  }>;
  methodology?: string;
}

export interface DomainSuggestion {
  name: string;
  domain: string;
  tld: string;
  score: number;
  styles: string[];
  method: string;
  available: boolean;
}

