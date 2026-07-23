import { NextResponse } from "next/server";
import { rateLimit } from "../../../utils/rateLimit";
import { getKV, incrKV } from "../../../utils/db";

// Check if User-Agent matches bots, scrapers, crawlers or automated scrapers
const isBot = (userAgent: string | null): boolean => {
  if (!userAgent) return false;
  const botPattern = /bot|crawler|spider|lighthouse|mediapartners|googlebot|bingbot|yandex|baidu|duckduck|slurp|headless|scraper|ai|chatgpt|claude|gemini|gpt/i;
  return botPattern.test(userAgent);
};

export async function GET(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
  const limitRes = await rateLimit(ip, "stats-get", 120, 60); // 120 reqs/min
  if (!limitRes.success) {
    return NextResponse.json({ error: "Límite de solicitudes superado" }, { status: 429 });
  }

  const userAgent = request.headers.get("user-agent");
  const isAgentBot = isBot(userAgent);

  try {
    const visitsStr = await getKV("stats:visits", "0");
    const likesStr = await getKV("stats:likes", "0");
    const dislikesStr = await getKV("stats:dislikes", "0");

    return NextResponse.json({
      visits: parseInt(visitsStr, 10),
      likes: parseInt(likesStr, 10),
      dislikes: parseInt(dislikesStr, 10),
      isBot: isAgentBot,
    });
  } catch (error) {
    console.error("Error reading stats from Neon DB:", error);
    return NextResponse.json({
      visits: null,
      likes: null,
      dislikes: null,
      isBot: isAgentBot
    });
  }
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
    const limitRes = await rateLimit(ip, "stats-post", 60, 60); // 60 reqs/min
    if (!limitRes.success) {
      return NextResponse.json({ error: "Límite de solicitudes superado" }, { status: 429 });
    }

    const { action } = await request.json();
    const userAgent = request.headers.get("user-agent");
    const isAgentBot = isBot(userAgent);

    if (isAgentBot) {
      return NextResponse.json({ isBot: true, counted: false, visits: 0, likes: 0, dislikes: 0 });
    }

    let visits = 0;
    let likes = 0;
    let dislikes = 0;

    // Load current values from DB to use as base, or fall back to 0
    try {
      const v = await getKV("stats:visits", "0");
      const l = await getKV("stats:likes", "0");
      const d = await getKV("stats:dislikes", "0");
      visits = parseInt(v, 10);
      likes = parseInt(l, 10);
      dislikes = parseInt(d, 10);
    } catch (e) {
      console.error("Error reading current stats before increment:", e);
      return NextResponse.json({
        visits: null,
        likes: null,
        dislikes: null,
        error: "Database connection failed"
      }, { status: 500 });
    }

    if (action === "visit") {
      visits = await incrKV("stats:visits", visits);
    } else if (action === "like") {
      likes = await incrKV("stats:likes", likes);
    } else if (action === "dislike") {
      dislikes = await incrKV("stats:dislikes", dislikes);
    }

    return NextResponse.json({ visits, likes, dislikes });
  } catch (error) {
    return NextResponse.json({ error: "Invalid action request" }, { status: 400 });
  }
}
