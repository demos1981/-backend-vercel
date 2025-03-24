import { DataSource } from "typeorm";
import { Item } from "../models/Item.entity";
import { CreateItemTable1742688060091 } from "../migrations/1742688060091-CreateItemTable";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [Item],
  migrations: [CreateItemTable1742688060091],
  migrationsRun: true, // Automatically run migrations on startup
  synchronize: false, // Set to false in production
  logging: !isProduction,
  connectTimeoutMS: 10000, // 10 seconds timeout
  extra: {
    max: 20, // maximum number of connections in the pool
    idleTimeoutMillis: 30000, // how long a connection can be idle before being closed
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
