import { NextResponse } from "next/server";
import net from "net";
import { DOMAIN_EXTENSIONS } from "@/components/domains/DomainData";

const WHOIS_SERVERS: { [key: string]: string } = {
  ".com": "whois.verisign-grs.com",
  ".net": "whois.verisign-grs.com",
  ".org": "whois.pir.org",
  ".es": "whois.nic.es",
  ".com.es": "whois.nic.es",
  ".nom.es": "whois.nic.es",
  ".org.es": "whois.nic.es",
  ".dev": "whois.nic.google",
  ".app": "whois.nic.google",
  ".cloud": "whois.nic.cloud",
  ".tech": "whois.nic.tech",
  ".online": "whois.nic.online",
  ".xyz": "whois.nic.xyz",
  ".shop": "whois.nic.shop",
  ".store": "whois.nic.store",
  ".blog": "whois.nic.blog",
  ".wiki": "whois.nic.wiki",
  ".design": "whois.nic.design",
  ".studio": "whois.nic.studio",
  ".art": "whois.nic.art",
  ".pro": "whois.nic.pro",
  ".info": "whois.nic.info",
  ".biz": "whois.nic.biz",
  ".club": "whois.nic.club",
  ".love": "whois.nic.love",
  ".one": "whois.nic.one",
  ".lat": "whois.nic.lat",
  ".help": "whois.nic.help",
  ".quest": "whois.nic.quest",
  ".homes": "whois.nic.homes",
  ".autos": "whois.nic.autos",
  ".ing": "whois.nic.google",
  ".mom": "whois.nic.mom",
  ".lk": "whois.nic.lk"
};

function getWhoisServer(domain: string): string | null {
  const lower = domain.toLowerCase();
  for (const ext in WHOIS_SERVERS) {
    if (lower.endsWith(ext)) {
      return WHOIS_SERVERS[ext];
    }
  }
  return null;
}

function queryTcpWhois(domain: string, server: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const socket = net.connect(43, server, () => {
      socket.write(domain + "\r\n");
    });

    let buffer = "";
    socket.on("data", (data) => {
      buffer += data.toString();
    });

    socket.on("end", () => {
      resolve(buffer);
    });

    socket.on("error", (err) => {
      reject(err);
    });

    // Slow WHOIS servers require timeout limit
    socket.setTimeout(3000, () => {
      socket.destroy();
      reject(new Error("Timeout"));
    });
  });
}

// Single domain availability fallback using legacy logics
async function checkSingleDomainFallback(domain: string): Promise<{ isAvailable: boolean | "error"; source: string }> {
  const lowerDomain = domain.toLowerCase();

  // 0. For .es and subdomains (.com.es, .nom.es, .org.es), check via Cloudflare DoH first since Red.es blocks TCP WHOIS
  if (lowerDomain.endsWith(".es") || lowerDomain.endsWith(".com.es") || lowerDomain.endsWith(".nom.es") || lowerDomain.endsWith(".org.es")) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const dohRes = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=SOA`, {
        headers: { "Accept": "application/dns-json" },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (dohRes.ok) {
        const dohData = await dohRes.json();
        if (dohData.Status === 3) {
          return { isAvailable: true, source: "doh-nxdomain" };
        } else if (dohData.Status === 0) {
          return { isAvailable: false, source: "doh-noerror" };
        }
      }
    } catch (dohErr) {
      // Fall through
    }
  }

  // 1. Check with WhoisJSON API Key
  const whoisJsonKey = process.env.WHOISJSON_API_KEY;
  if (whoisJsonKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const apiRes = await fetch(`https://whoisjson.com/api/v1/whois?domain=${domain}&token=${whoisJsonKey}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (apiRes.ok) {
        const apiData = await apiRes.json();
        if (typeof apiData.registered === "boolean") {
          return { isAvailable: !apiData.registered, source: "whois-json-api" };
        }
      }
    } catch (apiErr) {
      // Fall back
    }
  }

  // 2. Direct TCP WHOIS
  const whoisServer = getWhoisServer(domain);
  if (whoisServer) {
    try {
      const text = await queryTcpWhois(domain, whoisServer);
      const lowerText = text.toLowerCase();

      const availablePhrases = [
        "not found",
        "no match",
        "no matches",
        "no entries",
        "no data found",
        "not registered",
        "no se encuentra registrado",
        "objeto no existe",
        "does not exist"
      ];

      let matchesAvailable = false;
      for (const phrase of availablePhrases) {
        if (lowerText.includes(phrase)) {
          matchesAvailable = true;
          break;
        }
      }

      const reservedPhrases = [
        "reserved for",
        "reserved name",
        "reserved domain",
        "registry reserved",
        "restricted",
        "forbidden",
        "blocked"
      ];
      let matchesReserved = false;
      for (const phrase of reservedPhrases) {
        if (lowerText.includes(phrase)) {
          matchesReserved = true;
          break;
        }
      }

      if (matchesAvailable && !matchesReserved) {
        return { isAvailable: true, source: "tcp-whois-available" };
      } else {
        return { isAvailable: false, source: "tcp-whois-occupied" };
      }
    } catch (tcpErr) {
      // Fall back
    }
  }

  // 3. Cloudflare DoH Lookup
  let dohStatus: number | null = null;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const dohRes = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=SOA`, {
      headers: { "Accept": "application/dns-json" },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (dohRes.ok) {
      const dohData = await dohRes.json();
      dohStatus = dohData.Status;
      
      if (dohStatus === 0) {
        return { isAvailable: false, source: "doh-noerror" };
      }
    }
  } catch (dohErr) {
    // Fall back
  }

  // 4. HTTP fallbacks
  if (dohStatus === 3 || dohStatus === null) {
    if (lowerDomain.endsWith(".es")) {
      return { isAvailable: "error", source: "inconclusive-es" };
    }

    try {
      const rdapController = new AbortController();
      const rdapTimeout = setTimeout(() => rdapController.abort(), 8000);

      const rdapRes = await fetch(`https://rdap.org/domain/${domain}`, {
        method: "GET",
        signal: rdapController.signal,
        headers: { "Accept": "application/rdap+json, application/json" }
      });
      clearTimeout(rdapTimeout);

      if (rdapRes.status === 200) {
        return { isAvailable: false, source: "rdap-occupied" };
      } else if (rdapRes.status === 404) {
        return { isAvailable: true, source: "rdap-available" };
      }
    } catch (rdapErr) {
      try {
        const whodatController = new AbortController();
        const whodatTimeout = setTimeout(() => whodatController.abort(), 8000);

        const whodatRes = await fetch(`https://who-dat.as93.net/${domain}`, {
          signal: whodatController.signal
        });
        clearTimeout(whodatTimeout);

        if (whodatRes.ok) {
          const whodatData = await whodatRes.json();
          if (typeof whodatData.isRegistered === "boolean") {
            return { isAvailable: !whodatData.isRegistered, source: "whodat-api" };
          }
        }
      } catch (whodatErr) {
        // Ignore
      }
    }
  }

  return { isAvailable: "error", source: "failed-all-checks" };
}

// Check with Cloudflare Registrar API for pricing & authoritative status (if API key set)
async function checkCloudflareRegistrar(domain: string): Promise<{ isAvailable: boolean; price: number; currency: string } | null> {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  if (!token || !accountId) return null;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/registrar/domains/check?domain=${domain}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.result) {
        const result = data.result;
        return {
          isAvailable: result.available === true && result.registrable === true,
          price: result.pricing?.price || 0,
          currency: result.pricing?.currency || "USD"
        };
      }
    }
  } catch (err) {
    console.error("Cloudflare Registrar API error:", err);
  }
  return null;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const domainQuery = searchParams.get("domain");
    let name = searchParams.get("name") || "";
    let tldsParam = searchParams.get("tlds") || "";

    // Backward compatibility: if domain=startup.com is passed
    let isSingleMode = false;
    if (domainQuery && !name) {
      isSingleMode = true;
      const parts = domainQuery.split(".");
      name = parts[0];
      tldsParam = parts.slice(1).join(".");
    }

    if (!name) {
      return NextResponse.json({ error: "Nombre base o dominio no provisto" }, { status: 400 });
    }

    // Clean name and TLDs
    name = name.toLowerCase().trim();
    
    // If tlds is not provided, use all extensions in DOMAIN_EXTENSIONS
    let tldsList: string[] = [];
    if (tldsParam) {
      tldsList = tldsParam.split(",").map(t => t.replace(/^\./, "").trim().toLowerCase()).filter(Boolean);
    } else {
      tldsList = DOMAIN_EXTENSIONS.map(ext => ext.extension.replace(/^\./, ""));
    }

    const domscanKey = process.env.DOMSCAN_API_KEY;
    const finalResultsMap: Map<string, { isAvailable: boolean | "error"; source: string; priceOverride?: number }> = new Map();

    // 1. Try DomScan API (bulk search) if key is present
    let domscanSuccess = false;
    if (domscanKey && tldsList.length > 0) {
      try {
        // Exclude slow/unstable TLDs from DomScan bulk request (like Sri Lanka .lk which takes 16s+)
        const filteredTlds = tldsList.filter(tld => tld !== "lk");
        const cleanTlds = filteredTlds.join(",");
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);
        
        const domscanRes = await fetch(`https://domscan.net/v1/status?name=${name}&tlds=${cleanTlds}&prefer_cache=1`, {
          headers: { "X-API-Key": domscanKey },
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (domscanRes.ok) {
          const domscanData = await domscanRes.json();
          if (Array.isArray(domscanData.results)) {
            domscanData.results.forEach((item: any) => {
              if (item.error || item.status === "invalid" || item.status_flags?.includes("invalid")) {
                return; // Skip invalid domains/errors in DomScan so they go to checkSingleDomainFallback
              }
              const cleanedTld = "." + item.tld.replace(/^\./, "");
              finalResultsMap.set(cleanedTld, {
                isAvailable: typeof item.available === "boolean" ? item.available : "error",
                source: "domscan-api"
              });
            });
            domscanSuccess = true;
          }
        }
      } catch (err) {
        console.warn("DomScan API failed, falling back to legacy checks:", err);
      }
    }

    // 2. Perform fallback checks for TLDs not resolved by DomScan
    const remainingTlds = tldsList.filter(tld => !finalResultsMap.has("." + tld));
    if (remainingTlds.length > 0) {
      // Process remaining in parallel batches of 10
      const batchSize = 10;
      for (let i = 0; i < remainingTlds.length; i += batchSize) {
        const batch = remainingTlds.slice(i, i + batchSize);
        await Promise.all(batch.map(async (tld) => {
          const fqdn = `${name}.${tld}`;
          const fallbackRes = await checkSingleDomainFallback(fqdn);
          finalResultsMap.set("." + tld, fallbackRes);
        }));
      }
    }

    // 3. Optionally enrich available domains with Cloudflare Registrar prices if credentials exist
    const token = process.env.CLOUDFLARE_API_TOKEN;
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    if (token && accountId) {
      // Check Cloudflare pricing for checked domains
      const domainsToCheckCf = tldsList
        .map(tld => "." + tld)
        .filter(tld => {
          const res = finalResultsMap.get(tld);
          return res && res.isAvailable === true;
        });

      if (domainsToCheckCf.length > 0) {
        // Query Cloudflare for these domains in parallel batches of 5
        const batchSize = 5;
        for (let i = 0; i < domainsToCheckCf.length; i += batchSize) {
          const batch = domainsToCheckCf.slice(i, i + batchSize);
          await Promise.all(batch.map(async (tld) => {
            const fqdn = `${name}${tld}`;
            const cfInfo = await checkCloudflareRegistrar(fqdn);
            if (cfInfo) {
              finalResultsMap.set(tld, {
                isAvailable: cfInfo.isAvailable,
                source: "cloudflare-registrar-api",
                priceOverride: cfInfo.price
              });
            }
          }));
        }
      }
    }

    // 4. Map the checked statuses to full DomainResult format
    const results = tldsList.map((tldName) => {
      const dotTld = "." + tldName;
      const checkState = finalResultsMap.get(dotTld) || { isAvailable: "error", source: "not-checked" };
      const baseExtInfo = DOMAIN_EXTENSIONS.find(ext => ext.extension === dotTld) || {
        firstYearPrice: 10,
        renewalPrice: 15,
        isBestValue: false
      };

      return {
        extension: dotTld,
        isAvailable: checkState.isAvailable,
        firstYearPrice: checkState.priceOverride !== undefined ? checkState.priceOverride : baseExtInfo.firstYearPrice,
        renewalPrice: baseExtInfo.renewalPrice,
        isBestValue: baseExtInfo.isBestValue
      };
    });

    // Single mode response compatibility
    if (isSingleMode) {
      const singleRes = results[0] || { isAvailable: "error" };
      return NextResponse.json({
        isAvailable: singleRes.isAvailable,
        source: finalResultsMap.get("." + tldsList[0])?.source || "unknown"
      });
    }

    // Bulk mode response
    return NextResponse.json({
      name,
      results
    });

  } catch (error: any) {
    console.error("Domain check API error:", error);
    return NextResponse.json({ error: error.message || "Failed to check domains" }, { status: 500 });
  }
}
