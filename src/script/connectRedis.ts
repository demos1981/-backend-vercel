import { redis } from "../utils/tokenManagemnet";

const testRedisConnection = async () => {
  try {
    await redis.set("testKey", "testValue");
    const value = await redis.get("testKey");
    console.log("Redis test value:", value);
  } catch (error) {
    console.error("Redis connection test failed:", error.message);
  } finally {
    redis.disconnect();
  }
};

testRedisConnection();
