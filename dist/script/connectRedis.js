"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokenManagemnet_1 = require("../utils/tokenManagemnet");
const testRedisConnection = async () => {
    try {
        await tokenManagemnet_1.redis.set("testKey", "testValue");
        const value = await tokenManagemnet_1.redis.get("testKey");
        console.log("Redis test value:", value);
    }
    catch (error) {
        console.error("Redis connection test failed:", error.message);
    }
    finally {
        tokenManagemnet_1.redis.disconnect();
    }
};
testRedisConnection();
//# sourceMappingURL=connectRedis.js.map