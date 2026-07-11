import { DOMAIN_EXTENSIONS } from "./DomainData";

export interface ParsedDomain {
  rawInput: string;
  cleanInput: string;
  baseName: string;
  detectedExtension: string | null;
  isValid: boolean;
  error: string | null;
}

/**
 * Cleans a domain query by stripping protocols (http/https), www subdomain, paths, and spaces.
 */
export function cleanDomainInput(input: string): string {
  let cleaned = input.trim().toLowerCase();
  
  // Strip protocol
  cleaned = cleaned.replace(/^(https?:\/\/)?(www\.)?/, "");
  
  // Strip path/query params if any
  const slashIdx = cleaned.indexOf("/");
  if (slashIdx !== -1) {
    cleaned = cleaned.substring(0, slashIdx);
  }
  
  return cleaned;
}

/**
 * Parses and validates raw input to extract a base name and matched extension.
 */
export function parseAndValidateDomain(input: string): ParsedDomain {
  const result: ParsedDomain = {
    rawInput: input,
    cleanInput: "",
    baseName: "",
    detectedExtension: null,
    isValid: false,
    error: null,
  };

  // Real-time checks on the raw input before full cleaning
  if (input.startsWith(" ") || input.endsWith(" ")) {
    result.error = "No se permiten espacios al inicio o final.";
    return result;
  }

  if (input.includes("..")) {
    result.error = "No se permiten puntos consecutivos.";
    return result;
  }

  const clean = cleanDomainInput(input);
  result.cleanInput = clean;

  if (!clean) {
    result.error = "Escribe un nombre para buscar.";
    return result;
  }

  // Find if it ends with one of our supported extensions
  // Sort extensions by length descending to match double extensions (e.g. .com.es before .es)
  const sortedExtensions = [...DOMAIN_EXTENSIONS]
    .map(e => e.extension)
    .sort((a, b) => b.length - a.length);

  let detectedExt: string | null = null;
  let base = clean;

  for (const ext of sortedExtensions) {
    if (clean.endsWith(ext)) {
      detectedExt = ext;
      base = clean.substring(0, clean.length - ext.length);
      break;
    }
  }

  // If no official extension detected, check if it has some other dot extension
  if (!detectedExt && clean.includes(".")) {
    const lastDotIdx = clean.lastIndexOf(".");
    const ext = clean.substring(lastDotIdx);
    base = clean.substring(0, lastDotIdx);
    detectedExt = ext; // Custom extension not in our DB
  }

  result.baseName = base;
  result.detectedExtension = detectedExt;

  // Validate DNS rules on baseName
  if (!base) {
    result.error = "Falta el nombre base del dominio.";
    return result;
  }

  if (base.length < 2) {
    result.error = "El nombre debe tener al menos 2 caracteres.";
    return result;
  }

  if (base.length > 63) {
    result.error = "El nombre no puede superar los 63 caracteres.";
    return result;
  }

  // DNS labels cannot start or end with a hyphen
  if (base.startsWith("-") || base.endsWith("-")) {
    result.error = "El nombre no puede comenzar ni terminar con un guion.";
    return result;
  }

  // Check invalid DNS characters (only letters, numbers, and hyphens allowed in domain labels)
  const invalidDnsChars = /[^a-z0-9-]/;
  if (invalidDnsChars.test(base)) {
    result.error = "Solo se permiten letras, números y guiones (-).";
    return result;
  }

  // Double consecutive hyphens are discouraged/invalid in standard domains unless IDN
  if (base.includes("--")) {
    result.error = "No se permiten guiones consecutivos.";
    return result;
  }

  result.isValid = true;
  return result;
}
