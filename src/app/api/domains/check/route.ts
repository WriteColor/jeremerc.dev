import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get("domain");

    if (!domain) {
      return NextResponse.json({ error: "Dominio no provisto" }, { status: 400 });
    }

    // 1. Query Cloudflare DoH (fast, secure, covers all TLDs without local sandbox DNS blocks)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

      const dohRes = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=SOA`, {
        headers: { "Accept": "application/dns-json" },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (dohRes.ok) {
        const dohData = await dohRes.json();
        
        // Status 0 means NOERROR -> DNS records exist, domain is occupied
        if (dohData.Status === 0) {
          return NextResponse.json({ isAvailable: false, source: "doh-noerror" });
        }
        
        // Status 3 means NXDOMAIN -> Domain has no active SOA records
        if (dohData.Status === 3) {
          // If TLD is Spain (.es, .com.es, etc.), Red.es does not support standard RDAP at rdap.org
          // and they block port 43 WHOIS queries from cloud servers.
          // Since it's NXDOMAIN, and DNS is the only open check, we declare it available.
          if (domain.endsWith(".es")) {
            return NextResponse.json({ isAvailable: true, source: "doh-nxdomain-es" });
          }
          
          // For other TLDs, query RDAP to verify if it is bought but parked without DNS
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
            // If RDAP lookup fails, fall back to available since DNS also reported NXDOMAIN
            return NextResponse.json({ isAvailable: true, source: "doh-nxdomain-rdap-failed" });
          }
        }
      }
    } catch (dohErr) {
      // If DoH fails (network/timeout), try RDAP directly as primary fallback
      try {
        const rdapRes = await fetch(`https://rdap.org/domain/${domain}`, {
          method: "GET",
          headers: { "Accept": "application/rdap+json, application/json" }
        });
        if (rdapRes.status === 200) {
          return NextResponse.json({ isAvailable: false, source: "rdap-fallback-occupied" });
        } else if (rdapRes.status === 404 && !domain.endsWith(".es")) {
          return NextResponse.json({ isAvailable: true, source: "rdap-fallback-available" });
        }
      } catch (e) {
        // Fallback below
      }
    }

    // Default error state if lookup is inconclusive
    return NextResponse.json({ isAvailable: "error" });
  } catch (error: any) {
    console.error("Domain validation API route error:", error);
    return NextResponse.json({ error: error.message || "Failed to validate domain" }, { status: 500 });
  }
}
