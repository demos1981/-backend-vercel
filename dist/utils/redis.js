"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRefreshToken = exports.getRefreshToken = exports.storeRefreshToken = exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
exports.redis = new ioredis_1.default({
    host: process.env.REDIS_HOST || "18.156.158.53",
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
});
exports.redis.on("error", (err) => {
    console.error("[Redis] Connection error:", err.message);
});
exports.redis.on("connect", () => {
    console.log("[Redis] Connected successfully");
});
const storeRefreshToken = async (userId, token) => {
    await exports.redis.set(`refresh:${userId}`, token, "EX", 7 * 24 * 60 * 60);
};
exports.storeRefreshToken = storeRefreshToken;
const getRefreshToken = async (userId) => {
    return await exports.redis.get(`refresh:${userId}`);
};
exports.getRefreshToken = getRefreshToken;
const removeRefreshToken = async (userId) => {
    await exports.redis.del(`refresh:${userId}`);
};
exports.removeRefreshToken = removeRefreshToken;
//# sourceMappingURL=redis.js.map