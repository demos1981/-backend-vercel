import { DataSource } from "typeorm";
import { Item } from "../entities/Item";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  ssl: isProduction
    ? {
        rejectUnauthorized: false,
      }
    : false,
  entities: [Item],
  migrations: ["src/migrations/*.ts"],
  synchronize: false, // Set to false in production
  logging: !isProduction,
});
