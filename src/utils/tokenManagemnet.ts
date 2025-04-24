import Redis from "ioredis";

export const redis = new Redis({
  host: process.env.REDIS_HOST || "18.156.158.53",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  connectTimeout: 10000,
});

// Handle connection errors
redis.on("error", (err) => {
  console.error("[Redis] Connection error:", err.message);
});

redis.on("connect", () => {
  console.log("[Redis] Connected successfully");
});

// Функції для роботи з токенами в Redis
export const storeRefreshToken = async (userId: number, token: string) => {
  await redis.set(`refresh:${userId}`, token, "EX", 7 * 24 * 60 * 60); // 7 днів
};

export const getRefreshToken = async (userId: number) => {
  return await redis.get(`refresh:${userId}`);
};

export const removeRefreshToken = async (userId: number) => {
  await redis.del(`refresh:${userId}`);
};

export const getUserIdByToken = async (token: string) => {
  // Отримання всіх ключів, які починаються з "refresh:"
  const keys = await redis.keys("refresh:*");

  for (const key of keys) {
    const storedToken = await redis.get(key);
    if (storedToken === token) {
      // Отримуємо userId з ключа (формат "refresh:userId")
      const userId = parseInt(key.split(":")[1]);
      return userId;
    }
  }

  return null; // Токен не знайдено
};
