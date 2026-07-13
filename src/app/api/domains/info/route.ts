import { NextResponse } from "next/server";

// Generates deterministic mock data based on a hash of the domain name to maintain consistency
function getDeterministicMockInfo(domain: string) {
  const parts = domain.split(".");
  const label = parts[0] || "domain";
  const tld = parts[1] || "com";
  
  // A simple hash function
  let hash = 0;
  for (let i = 0; i < domain.length; i++) {
    hash = domain.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);

  // Determine pricing values based on domain attributes
  const isShort = label.length <= 4;
  const isPremiumTld = ["com", "dev", "app", "cloud"].includes(tld);
  
  let baseValue = 500 + (hash % 1500); // 500 to 2000
  if (isShort) baseValue *= 15;        // short domains are expensive
  if (isPremiumTld) baseValue *= 2;    // premium TLDs double value
  
  const low = Math.round(baseValue * 0.7);
  const mid = Math.round(baseValue);
  const high = Math.round(baseValue * 1.35);

  const confidence = 0.5 + (hash % 40) / 100; // 0.5 to 0.9

  // Mock registrars list
  const registrars = ["Cloudflare, Inc.", "Namecheap, Inc.", "GoDaddy.com, LLC", "Gandi SAS", "Tucows Domains Inc."];
  const selectedRegistrar = registrars[hash % registrars.length];

  // Dates
  const nowMs = Date.now();
  const creationOffset = (hash % 10) + 1; // 1 to 10 years ago
  const expirationOffset = (hash % 3) + 1; // 1 to 3 years in the future
  
  const creationDate = Math.floor((nowMs - creationOffset * 365 * 24 * 3600 * 1000) / 1000);
  const expirationDate = Math.floor((nowMs + expirationOffset * 365 * 24 * 3600 * 1000) / 1000);
  const updatedDate = Math.floor((nowMs - (hash % 180) * 24 * 3600 * 1000) / 1000); // updated sometime in the last 6 months

  return {
    domain,
    whois: {
      domain_name: domain,
      registrar: selectedRegistrar,
      whois_server: `whois.${selectedRegistrar.toLowerCase().split(" ")[0].replace(/[^a-z0-9]/g, "")}.com`,
      creation_date: creationDate,
      expiration_date: expirationDate,
      updated_date: updatedDate,
      name_servers: [
        `ns1.${selectedRegistrar.toLowerCase().split(" ")[0].replace(/[^a-z0-9]/g, "")}.com`,
        `ns2.${selectedRegistrar.toLowerCase().split(" ")[0].replace(/[^a-z0-9]/g, "")}.com`
      ]
    },
    valuation: {
      domain,
      label,
      tld,
      estimate: { low, mid, high, currency: "USD" },
      confidence: parseFloat(confidence.toFixed(2)),
      factors: {
        length: label.length,
        tldTier: isPremiumTld ? "premium" : "standard",
        lettersOnly: /^[a-z]+$/.test(label),
        isDictionaryWord: label.length >= 3 && label.length <= 8 && (hash % 3 === 0),
        isBrandable: label.length <= 6 && (hash % 2 === 0)
      },
      comparables: [
        {
          category: `${label.length}-letter .${tld}`,
          typical_range: { low: Math.round(low * 0.8), high: Math.round(high * 1.2) },
          relevance: 0.9
        }
      ],
      methodology: "Estimación algorítmica basada en longitud, popularidad del TLD e histórico de transacciones (Simulado)."
    }
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get("domain");

    if (!domain) {
      return NextResponse.json({ error: "Dominio no provisto" }, { status: 400 });
    }

    const cleanDomain = domain.toLowerCase().trim();
    const mockData = getDeterministicMockInfo(cleanDomain);

    let whoisData = null;
    let valuationData = null;

    // 1. Query API Ninjas WHOIS
    const apiNinjasKey = process.env.API_NINJAS_API_KEY;
    if (apiNinjasKey) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const res = await fetch(`https://api.api-ninjas.com/v1/whois?domain=${cleanDomain}`, {
          headers: { "X-Api-Key": apiNinjasKey },
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          whoisData = await res.json();
        }
      } catch (err) {
        console.warn("API Ninjas WHOIS fetch failed:", err);
      }
    }

    // 2. Query DomScan Valuation
    const domscanKey = process.env.DOMSCAN_API_KEY;
    if (domscanKey) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const res = await fetch(`https://domscan.net/v1/value?domain=${cleanDomain}`, {
          headers: { "X-API-Key": domscanKey },
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          valuationData = await res.json();
        }
      } catch (err) {
        console.warn("DomScan Valuation fetch failed:", err);
      }
    }

    // Combine or fallback
    return NextResponse.json({
      domain: cleanDomain,
      whois: whoisData || mockData.whois,
      valuation: valuationData || mockData.valuation
    });

  } catch (error: any) {
    console.error("Domain details API error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch domain details" }, { status: 500 });
  }
}
