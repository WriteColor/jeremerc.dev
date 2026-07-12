import { NextResponse } from "next/server";
import net from "net";

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

    // Slow WHOIS servers like whois.nic.es require longer timeout limit
    socket.setTimeout(4500, () => {
      socket.destroy();
      reject(new Error("Timeout"));
    });
  });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get("domain");

    if (!domain) {
      return NextResponse.json({ error: "Dominio no provisto" }, { status: 400 });
    }

    const lowerDomain = domain.toLowerCase();

    // 1. Check if WhoisJSON API Key is provided (Highly accurate, Cloud-safe API check)
    const whoisJsonKey = process.env.WHOISJSON_API_KEY;
    if (whoisJsonKey) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);
        
        const apiRes = await fetch(`https://whoisjson.com/api/v1/whois?domain=${domain}&token=${whoisJsonKey}`, {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (apiRes.ok) {
          const apiData = await apiRes.json();
          if (typeof apiData.registered === "boolean") {
            return NextResponse.json({ isAvailable: !apiData.registered, source: "whois-json-api" });
          }
        }
      } catch (apiErr) {
        // Fall back
      }
    }

    // 2. Direct TCP WHOIS (No key, works on local development and unblocked VPS environments)
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
          "objeto no existe"
        ];

        let matchesAvailable = false;
        for (const phrase of availablePhrases) {
          if (lowerText.includes(phrase)) {
            matchesAvailable = true;
            break;
          }
        }

        // Match "available" only if not preceded by negative phrase
        if (lowerText.includes("available") && !lowerText.includes("not available")) {
          matchesAvailable = true;
        }

        // Registry reserved keywords
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
          return NextResponse.json({ isAvailable: true, source: "tcp-whois-available" });
        } else {
          return NextResponse.json({ isAvailable: false, source: "tcp-whois-occupied" });
        }
      } catch (tcpErr) {
        // Fall back to HTTP-based verifications
      }
    }

    // 3. Fallback to Cloudflare DoH (Resolves active domains via HTTPS)
    let dohStatus: number | null = null;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const dohRes = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=SOA`, {
        headers: { "Accept": "application/dns-json" },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (dohRes.ok) {
        const dohData = await dohRes.json();
        dohStatus = dohData.Status;
        
        // Status 0 (NOERROR) means the domain has active name servers -> definitely registered
        if (dohStatus === 0) {
          return NextResponse.json({ isAvailable: false, source: "doh-noerror" });
        }
      }
    } catch (dohErr) {
      // Inconclusive DoH
    }

    // 4. HTTP-based fallback (Only if DoH returned NXDOMAIN or failed, and TCP failed/blocked)
    if (dohStatus === 3 || dohStatus === null) {
      // For .es, since Spain has no RDAP and public WHOIS scraper lists are broken/gated,
      // we must declare it inconclusive (error) to avoid false positives.
      if (lowerDomain.endsWith(".es")) {
        return NextResponse.json({ isAvailable: "error", source: "inconclusive-es" });
      }

      // For non-es domains, query rdap.org redirector
      try {
        const rdapController = new AbortController();
        const rdapTimeout = setTimeout(() => rdapController.abort(), 3500);

        const rdapRes = await fetch(`https://rdap.org/domain/${domain}`, {
          method: "GET",
          signal: rdapController.signal,
          headers: { "Accept": "application/rdap+json, application/json" }
        });
        clearTimeout(rdapTimeout);

        if (rdapRes.status === 200) {
          return NextResponse.json({ isAvailable: false, source: "rdap-occupied" });
        } else if (rdapRes.status === 404) {
          return NextResponse.json({ isAvailable: true, source: "rdap-available" });
        }
      } catch (rdapErr) {
        // Fall back to who-dat public API instance
        try {
          const whodatController = new AbortController();
          const whodatTimeout = setTimeout(() => whodatController.abort(), 3500);

          const whodatRes = await fetch(`https://who-dat.as93.net/${domain}`, {
            signal: whodatController.signal
          });
          clearTimeout(whodatTimeout);

          if (whodatRes.ok) {
            const whodatData = await whodatRes.json();
            if (typeof whodatData.isRegistered === "boolean") {
              return NextResponse.json({ isAvailable: !whodatData.isRegistered, source: "whodat-api" });
            }
          }
        } catch (whodatErr) {
          // Ignore
        }
      }
    }

    // If all stages fail or are inconclusive, report error instead of returning false positives
    return NextResponse.json({ isAvailable: "error", source: "failed-all-checks" });
  } catch (error: any) {
    console.error("Domain validation API route error:", error);
    return NextResponse.json({ error: error.message || "Failed to validate domain" }, { status: 500 });
  }
}
