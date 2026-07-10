import { getDb } from "./db";

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

const memoryCache = new Map<string, { count: number; resetTime: number }>();

// Periodically clean memoryCache to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, val] of memoryCache.entries()) {
      if (now > val.resetTime) {
        memoryCache.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export async function rateLimit(
  ip: string,
  endpoint: string,
  limit: number,
  durationSeconds: number
): Promise<RateLimitResult> {
  const key = `rate_limit:${ip}:${endpoint}`;
  const now = Date.now();
  const resetDurationMs = durationSeconds * 1000;
  const resetTime = now + resetDurationMs;

  const sql = getDb();

  // 1. Neon DB distributed rate limit
  if (sql) {
    try {
      // Clean expired rate limits asynchronously to keep the table size small
      sql`DELETE FROM rate_limits WHERE reset_time < ${now}`.catch((err) =>
        console.error("Error cleaning expired rate limits from Neon DB:", err)
      );

      // Atomic Upsert: insert initial count or increment existing, returning new count and active reset time
      const rows = await sql`
        INSERT INTO rate_limits (key, count, reset_time)
        VALUES (${key}, 1, ${resetTime})
        ON CONFLICT (key)
        DO UPDATE SET count = rate_limits.count + 1
        RETURNING count, reset_time
      `;

      if (rows && rows.length > 0) {
        const dbCount = rows[0].count;
        const dbResetTime = parseInt(rows[0].reset_time, 10);
        const success = dbCount <= limit;
        const remaining = Math.max(0, limit - dbCount);

        return { success, limit, remaining, reset: dbResetTime };
      }
    } catch (e) {
      console.error("Neon DB Rate Limit error, falling back to local memory:", e);
    }
  }

  // 2. In-memory fallback
  const cached = memoryCache.get(key);

  if (!cached || now > cached.resetTime) {
    memoryCache.set(key, { count: 1, resetTime });
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: resetTime,
    };
  }

  cached.count += 1;
  const success = cached.count <= limit;
  const remaining = Math.max(0, limit - cached.count);

  return {
    success,
    limit,
    remaining,
    reset: cached.resetTime,
  };
}
