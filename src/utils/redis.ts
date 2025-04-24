import Redis from "ioredis";

export const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
});

// Handle connection errors
redis.on("error", (err) => {
  console.error("[Redis] Connection error:", err.message);
});

redis.on("connect", () => {
  console.log("[Redis] Connected successfully");
});

export const storeRefreshToken = async (userId: number, token: string) => {
  await redis.set(`refresh:${userId}`, token, "EX", 7 * 24 * 60 * 60); // 7 днів
};

export const getRefreshToken = async (userId: number) => {
  return await redis.get(`refresh:${userId}`);
};

export const removeRefreshToken = async (userId: number) => {
  await redis.del(`refresh:${userId}`);
};
