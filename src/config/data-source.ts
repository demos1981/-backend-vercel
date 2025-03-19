import { DataSource } from "typeorm";
import { Item } from "../models/Item.entity";
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
  migrations: ["src/migrations/*.ts"],
  synchronize: false, // Set to false in production
  logging: !isProduction,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
