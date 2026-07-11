import { NextResponse } from "next/server";
import dns from "dns";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get("domain");

    if (!domain) {
      return NextResponse.json({ error: "Dominio no provisto" }, { status: 400 });
    }

    // 1. Fast DNS Check via native node dns
    try {
      const nsRecords = await dns.promises.resolveNs(domain);
      if (nsRecords && nsRecords.length > 0) {
        return NextResponse.json({ isAvailable: false, source: "dns-ns" });
      }
    } catch (dnsErr: any) {
      // Continue if DNS resolve fails
    }

    try {
      const soaRecord = await dns.promises.resolveSoa(domain);
      if (soaRecord) {
        return NextResponse.json({ isAvailable: false, source: "dns-soa" });
      }
    } catch (dnsErr: any) {
      // Continue
    }

    // 2. Fallback to RDAP query (Official WHOIS successor, run on server to bypass CORS)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const rdapRes = await fetch(`https://rdap.org/domain/${domain}`, {
        method: "GET",
        signal: controller.signal,
        headers: {
          "Accept": "application/rdap+json, application/json",
        }
      });
      clearTimeout(timeoutId);

      if (rdapRes.status === 200) {
        return NextResponse.json({ isAvailable: false, source: "rdap-occupied" });
      } else if (rdapRes.status === 404) {
        return NextResponse.json({ isAvailable: true, source: "rdap-available" });
      }
    } catch (rdapErr) {
      // Continue to next fallback
    }

    // 3. Fallback to Cloudflare DNS-over-HTTPS JSON API
    try {
      const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=SOA`, {
        headers: { accept: "application/dns-json" },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.Status === 3) {
          return NextResponse.json({ isAvailable: true, source: "doh-available" });
        } else if (data.Status === 0) {
          return NextResponse.json({ isAvailable: false, source: "doh-occupied" });
        }
      }
    } catch (dohErr) {
      // Ignore
    }

    // Return error if all methods fail or timeout
    return NextResponse.json({ isAvailable: "error" });
  } catch (error: any) {
    console.error("Domain validation API route error:", error);
    return NextResponse.json({ error: error.message || "Failed to validate domain" }, { status: 500 });
  }
}
