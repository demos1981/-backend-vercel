"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Item_entity_1 = require("../models/Item.entity");
const _1710716400000_CreateItemTable_1 = require("../migrations/1710716400000-CreateItemTable");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isProduction = process.env.NODE_ENV === "production";
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    entities: [Item_entity_1.Item],
    migrations: [_1710716400000_CreateItemTable_1.CreateItemTable1710716400000],
    migrationsRun: true,
    synchronize: false,
    logging: !isProduction,
});
//# sourceMappingURL=data-source.js.map