"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redis = new ioredis_1.default(process.env.REDIS_URL);
const initializeRedis = async () => {
    try {
        const newEntityKey = "newEntity";
        const existing = await redis.exists(newEntityKey);
        if (existing) {
            console.log(`⚠️ Ключ "${newEntityKey}" вже існує. Ініціалізація пропущена.`);
            return process.exit(0);
        }
        const newEntityValue = {
            id: "1",
            name: "Sample Entity",
            description: "This is a sample entity for Redis",
            createdAt: new Date().toISOString(),
        };
        await redis.set(newEntityKey, JSON.stringify(newEntityValue));
        console.log(`New entity added to Redis with key: ${newEntityKey}`);
        process.exit(0);
    }
    catch (error) {
        console.error("Error initializing Redis entity:", error);
        process.exit(1);
    }
};
initializeRedis();
//# sourceMappingURL=initializeRedis.js.map