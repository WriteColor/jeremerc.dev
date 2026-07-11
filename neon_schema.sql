-- Estructura de base de datos para jeremerc.dev en Neon PostgreSQL
-- Inicializa las tablas necesarias para caché, logs de contacto y rate limiting.

-- 1. Tabla de Caché KV (Visitas, Likes, Dislikes)
CREATE TABLE IF NOT EXISTS kv_cache (
    key VARCHAR(255) PRIMARY KEY,
    value TEXT NOT NULL
);

-- 2. Tabla de Mensajes de Contacto
CREATE TABLE IF NOT EXISTS contact_logs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45)
);

-- 3. Tabla de Control de Rate Limiting
CREATE TABLE IF NOT EXISTS rate_limits (
    key VARCHAR(255) PRIMARY KEY,
    count INT NOT NULL,
    reset_time BIGINT NOT NULL
);

-- 4. Datos de Prueba / Iniciales (Seed Data)
INSERT INTO kv_cache (key, value)
VALUES 
    ('stats:visits', '524'),
    ('stats:likes', '142'),
    ('stats:dislikes', '5')
ON CONFLICT (key) 
DO UPDATE SET value = EXCLUDED.value;
