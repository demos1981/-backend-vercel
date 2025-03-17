import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./config/data-source";
import { Item } from "./entities/Item";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize TypeORM
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) =>
    console.log("Error during Data Source initialization:", error)
  );

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response): void => {
  res.json({ status: "ok" });
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

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
