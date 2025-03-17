"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Item_1 = require("../entities/Item");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isProduction = process.env.NODE_ENV === "production";
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    entities: [Item_1.Item],
    migrations: ["src/migrations/*.ts"],
    synchronize: false,
    logging: !isProduction,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});
//# sourceMappingURL=data-source.js.map