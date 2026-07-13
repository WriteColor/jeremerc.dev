import { NextResponse } from "next/server";

// Fallback algorithm to generate suggestions deterministically if DomScan is unavailable
function generateMockSuggestions(keywords: string, tldsParam: string) {
  const kwList = keywords.split(",").map(k => k.trim().toLowerCase()).filter(Boolean);
  if (kwList.length === 0) kwList.push("proyecto");

  const tlds = tldsParam ? tldsParam.split(",").map(t => t.replace(/^\./, "").trim()) : ["com", "net", "dev", "app", "cloud"];

  const prefixes = ["get", "go", "try", "smart", "next", "my", "play", "neo"];
  const suffixes = ["app", "hub", "labs", "tech", "cloud", "sphere", "hq", "core", "x"];
  
  const suggestions: Array<{
    name: string;
    domain: string;
    tld: string;
    score: number;
    styles: string[];
    method: string;
    available: boolean;
  }> = [];

  let count = 0;
  
  // Cross combine keywords and prefixes/suffixes to create 12 unique options
  for (const kw of kwList) {
    // 1. Prefix combinations
    prefixes.forEach((pref, index) => {
      if (count >= 15) return;
      const name = `${pref}${kw}`;
      const tld = tlds[count % tlds.length];
      const hash = name.length + tld.length + index;
      
      suggestions.push({
        name,
        domain: `${name}.${tld}`,
        tld,
        score: 80 + (hash % 18),
        styles: ["brandable"],
        method: "prefix-add",
        available: hash % 3 !== 0 // 66% available
      });
      count++;
    });

    // 2. Suffix combinations
    suffixes.forEach((suff, index) => {
      if (count >= 15) return;
      const name = `${kw}${suff}`;
      const tld = tlds[count % tlds.length];
      const hash = name.length + tld.length + index;

      suggestions.push({
        name,
        domain: `${name}.${tld}`,
        tld,
        score: 75 + (hash % 22),
        styles: ["keyword-rich"],
        method: "suffix-add",
        available: hash % 4 !== 0 // 75% available
      });
      count++;
    });
  }

  // Sort suggestions by score descending
  suggestions.sort((a, b) => b.score - a.score);

  return {
    suggestions,
    keywords: kwList,
    generated_count: suggestions.length,
    available_count: suggestions.filter(s => s.available).length
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const keywords = searchParams.get("keywords") || "";
    const limit = searchParams.get("limit") || "15";
    const style = searchParams.get("style") || "brandable";
    const tlds = searchParams.get("tlds") || "com,ai,app,dev,net";

    if (!keywords) {
      return NextResponse.json({ error: "Palabras clave no provistas" }, { status: 400 });
    }

    const cleanKeywords = keywords.trim();
    const domscanKey = process.env.DOMSCAN_API_KEY;

    // 1. Try DomScan suggest API if key is present
    if (domscanKey) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const res = await fetch(`https://domscan.net/v1/suggest?keywords=${encodeURIComponent(cleanKeywords)}&limit=${limit}&style=${style}&tlds=${encodeURIComponent(tlds)}`, {
          headers: { "X-API-Key": domscanKey },
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          return NextResponse.json(data);
        }
      } catch (err) {
        console.warn("DomScan Suggestions API failed, falling back to mock suggestions:", err);
      }
    }

    // 2. Fallback: generate mock suggestions deterministically
    const mockSuggestions = generateMockSuggestions(cleanKeywords, tlds);
    return NextResponse.json(mockSuggestions);

  } catch (error: any) {
    console.error("Suggestions API error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate suggestions" }, { status: 500 });
  }
}
