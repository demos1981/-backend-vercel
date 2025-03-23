import { DataSource } from "typeorm";
import { Item } from "../models/Item.entity";
import { CreateItemTable1742688060091 } from "../migrations/1742688060091-CreateItemTable";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [Item],
  migrations: [CreateItemTable1742688060091],
  migrationsRun: true, // Automatically run migrations on startup
  synchronize: false, // Set to false in production
  logging: !isProduction,
});
