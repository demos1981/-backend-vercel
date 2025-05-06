"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdByToken = exports.removeRefreshToken = exports.getRefreshToken = exports.storeRefreshToken = exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
exports.redis = new ioredis_1.default({
    host: "localhost",
    port: 6379,
});
exports.redis.on("error", (err) => {
    console.error("[Redis] Connection error:", err.message);
});
exports.redis.on("connect", () => {
    console.log("[Redis] Connected successfully");
});
const storeRefreshToken = async (userId, token) => {
    const keyByUserId = `refresh:${userId}`;
    const keyByToken = `refresh_token:${token}`;
    const expiration = 7 * 24 * 60 * 60;
    await Promise.all([
        exports.redis.set(keyByUserId, token, "EX", expiration),
        exports.redis.set(keyByToken, userId.toString(), "EX", expiration),
    ]);
};
exports.storeRefreshToken = storeRefreshToken;
const getRefreshToken = async (userId) => {
    const key = `refresh:${userId}`;
    return await exports.redis.get(key);
};
exports.getRefreshToken = getRefreshToken;
const removeRefreshToken = async (userId) => {
    const keyByUserId = `refresh:${userId}`;
    const token = await exports.redis.get(keyByUserId);
    if (token) {
        const keyByToken = `refresh_token:${token}`;
        await exports.redis.del(keyByUserId, keyByToken);
    }
};
exports.removeRefreshToken = removeRefreshToken;
const getUserIdByToken = async (token) => {
    const key = `refresh_token:${token}`;
    const userIdStr = await exports.redis.get(key);
    return userIdStr ? parseInt(userIdStr) : null;
};
exports.getUserIdByToken = getUserIdByToken;
//# sourceMappingURL=tokenManagemnet.js.map