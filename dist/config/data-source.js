"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Item_entity_1 = require("../models/Item.entity");
const User_entity_1 = require("../models/User.entity");
const _1742688060091_CreateItemTable_1 = require("../migrations/1742688060091-CreateItemTable");
const _1680000000000_CreateUser_1 = require("../migrations/1680000000000-CreateUser");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isProduction = process.env.NODE_ENV === "production";
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    entities: [User_entity_1.User, Item_entity_1.Item],
    migrations: [_1742688060091_CreateItemTable_1.CreateItemTable1742688060091, _1680000000000_CreateUser_1.CreateUser1680000000000],
    migrationsRun: true,
    synchronize: false,
    logging: !isProduction,
});
//# sourceMappingURL=data-source.js.map