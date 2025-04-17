import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/data-source";
import itemRoutes from "./routes/item.routes";
import mediaRoutes from "./routes/media.routes";
import { errorHandler } from "./middleware/error.middleware";
import dotenv from "dotenv";
import { createServer } from "net";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { checkSupabaseConnection } from "./config/supabase.config";

dotenv.config();
injectSpeedInsights();
const app = express();
const defaultPort = parseInt(process.env.PORT || "3000", 10);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/items", itemRoutes);
app.use("/api/media", mediaRoutes);

// Health check endpoint
app.get("/", (_req, res) => {
  res.send("Hello, server is listen you gays!");
});

// Error handling middleware
app.use(errorHandler);

// Перевірка, чи порт зайнятий
const isPortInUse = (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const server = createServer()
      .listen(port, () => {
        server.close();
        resolve(false);
      })
      .on("error", () => {
        resolve(true);
      });
  });
};

// Пошук вільного порт
const findAvailablePort = async (startPort: number): Promise<number> => {
  let port = startPort;
  while (await isPortInUse(port)) {
    port++;
  }
  return port;
};

// Initialize TypeORM and start server
const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    const isSupabaseConnected = await checkSupabaseConnection(); //  перевірка supabase
    if (!isSupabaseConnected) {
      console.error("❌ Failed to connect to Supabase");
      process.exit(1);
    }

    const port = await findAvailablePort(defaultPort);
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error during initialization:", error);
    process.exit(1);
  }
};

startServer();

export default app;
