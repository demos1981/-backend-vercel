import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./config/data-source";
import { Item } from "./entities/Item";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const defaultPort: number = parseInt(process.env.PORT || "3001", 10);

// Middleware
app.use(cors());
app.use(express.json());

// Function to find an available port
const findAvailablePort = async (startPort: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    const server = require("net").createServer();

    server.listen(startPort, () => {
      const port = (server.address() as any).port;
      server.close(() => resolve(port));
    });

    server.on("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        resolve(findAvailablePort(startPort + 1));
      } else {
        reject(err);
      }
    });
  });
};

// Initialize TypeORM and start server
const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    const port = await findAvailablePort(defaultPort);
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error during initialization:", error);
    process.exit(1);
  }
};

startServer();

// Health check endpoint
app.get("/", (_req: Request, res: Response): void => {
  res.send("Hello, server is listen you");
});

// Get all items
app.get("/api/items", async (_req: Request, res: Response): Promise<void> => {
  try {
    const itemRepository = AppDataSource.getRepository(Item);
    const items = await itemRepository.find();
    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create new item
app.post("/api/items", async (req: Request, res: Response): Promise<void> => {
  try {
    const itemRepository = AppDataSource.getRepository(Item);
    const newItem = itemRepository.create(req.body);
    const result = await itemRepository.save(newItem);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get item by ID
app.get(
  "/api/items/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const itemRepository = AppDataSource.getRepository(Item);
      const item = await itemRepository.findOneBy({
        id: parseInt(req.params.id),
      });
      if (!item) {
        res.status(404).json({ error: "Item not found" });
        return;
      }
      res.json(item);
    } catch (error) {
      console.error("Error fetching item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Update item
app.put(
  "/api/items/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const itemRepository = AppDataSource.getRepository(Item);
      const item = await itemRepository.findOneBy({
        id: parseInt(req.params.id),
      });
      if (!item) {
        res.status(404).json({ error: "Item not found" });
        return;
      }
      itemRepository.merge(item, req.body);
      const result = await itemRepository.save(item);
      res.json(result);
    } catch (error) {
      console.error("Error updating item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Delete item
app.delete(
  "/api/items/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const itemRepository = AppDataSource.getRepository(Item);
      const item = await itemRepository.findOneBy({
        id: parseInt(req.params.id),
      });
      if (!item) {
        res.status(404).json({ error: "Item not found" });
        return;
      }
      await itemRepository.remove(item);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
