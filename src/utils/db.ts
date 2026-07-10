import { neon } from "@neondatabase/serverless";

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

let initialized = false;

async function initTables() {
  if (initialized || !sql) return;
  try {
    // Create KV Cache table
    await sql`
      CREATE TABLE IF NOT EXISTS kv_cache (
        key VARCHAR(255) PRIMARY KEY,
        value TEXT NOT NULL
      );
    `;

    // Create contact message submissions log table
    await sql`
      CREATE TABLE IF NOT EXISTS contact_logs (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45)
      );
    `;

    // Create rate limits table
    await sql`
      CREATE TABLE IF NOT EXISTS rate_limits (
        key VARCHAR(255) PRIMARY KEY,
        count INT NOT NULL,
        reset_time BIGINT NOT NULL
      );
    `;

    initialized = true;
  } catch (error) {
    console.error("Neon DB table initialization error:", error);
  }
}

/**
 * Exports the active Neon SQL connection client instance.
 */
export function getDb() {
  return sql;
}

/**
 * Gets a value from the KV cache table. Returns fallback if connection fails or key is missing.
 */
export async function getKV(key: string, fallback: string): Promise<string> {
  if (!sql) return fallback;
  await initTables();
  try {
    const result = await sql`SELECT value FROM kv_cache WHERE key = ${key}`;
    if (result && result.length > 0) {
      return result[0].value;
    }
  } catch (error) {
    console.error(`Error reading key ${key} from Neon DB:`, error);
  }
  return fallback;
}

/**
 * Sets a value in the KV cache table.
 */
export async function setKV(key: string, value: string): Promise<void> {
  if (!sql) return;
  await initTables();
  try {
    await sql`
      INSERT INTO kv_cache (key, value)
      VALUES (${key}, ${value})
      ON CONFLICT (key)
      DO UPDATE SET value = EXCLUDED.value
    `;
  } catch (error) {
    console.error(`Error setting key ${key} in Neon DB:`, error);
  }
}

/**
 * Increments a numeric value in the KV cache table. Returns the new value.
 */
export async function incrKV(key: string, fallback: number): Promise<number> {
  if (!sql) return fallback + 1;
  await initTables();
  try {
    const result = await sql`
      INSERT INTO kv_cache (key, value)
      VALUES (${key}, ${(fallback + 1).toString()})
      ON CONFLICT (key)
      DO UPDATE SET value = (COALESCE(NULLIF(kv_cache.value, ''), '0')::int + 1)::text
      RETURNING value
    `;
    if (result && result.length > 0) {
      return parseInt(result[0].value, 10);
    }
  } catch (error) {
    console.error(`Error incrementing key ${key} in Neon DB:`, error);
  }
  return fallback + 1;
}

/**
 * Logs a successful contact form submission message.
 */
export async function logContactMessage(
  name: string,
  email: string,
  message: string,
  ipAddress: string
): Promise<void> {
  if (!sql) return;
  await initTables();
  try {
    await sql`
      INSERT INTO contact_logs (name, email, message, ip_address)
      VALUES (${name}, ${email}, ${message}, ${ipAddress})
    `;
  } catch (error) {
    console.error("Error logging contact message in Neon DB:", error);
  }
}
