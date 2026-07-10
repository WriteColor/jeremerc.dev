import { NextResponse } from "next/server";
import { rateLimit } from "../../../utils/rateLimit";
import { getKV, incrKV } from "../../../utils/db";

// Simulated base stats in case no database is set up
const mockStats = {
  visits: 1482,
  likes: 314,
  dislikes: 8,
};

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
    const visitsStr = await getKV("stats:visits", mockStats.visits.toString());
    const likesStr = await getKV("stats:likes", mockStats.likes.toString());
    const dislikesStr = await getKV("stats:dislikes", mockStats.dislikes.toString());

    return NextResponse.json({
      visits: parseInt(visitsStr, 10),
      likes: parseInt(likesStr, 10),
      dislikes: parseInt(dislikesStr, 10),
      isBot: isAgentBot,
    });
  } catch (error) {
    console.error("Error reading stats from Neon DB, using mock fallback:", error);
    return NextResponse.json({ ...mockStats, isBot: isAgentBot });
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
      return NextResponse.json({ error: "Bots not counted" }, { status: 403 });
    }

    let visits = mockStats.visits;
    let likes = mockStats.likes;
    let dislikes = mockStats.dislikes;

    // Load current values from DB to use as base, or fall back to mock
    try {
      const v = await getKV("stats:visits", mockStats.visits.toString());
      const l = await getKV("stats:likes", mockStats.likes.toString());
      const d = await getKV("stats:dislikes", mockStats.dislikes.toString());
      visits = parseInt(v, 10);
      likes = parseInt(l, 10);
      dislikes = parseInt(d, 10);
    } catch (e) {
      console.error("Error reading current stats before increment:", e);
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
