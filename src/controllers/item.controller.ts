import { Request, Response } from "express";
import { ItemService } from "../services/item.service";
import { ICreateItemDto, IUpdateItemDto } from "../types/item.types";

export class ItemController {
  private itemService: ItemService;

  constructor() {
    this.itemService = new ItemService();
  }

  getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const items = await this.itemService.findAll();
      res.json(items);
    } catch (error) {
      console.error("Error fetching items:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const item = await this.itemService.findById(id);

      if (!item) {
        res.status(404).json({ error: "Item not found" });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error("Error fetching item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const createItemDto: ICreateItemDto = req.body;
      const newItem = await this.itemService.create(createItemDto);
      res.status(201).json(newItem);
    } catch (error) {
      console.error("Error creating item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const updateItemDto: IUpdateItemDto = req.body;
      const updatedItem = await this.itemService.update(id, updateItemDto);

      if (!updatedItem) {
        res.status(404).json({ error: "Item not found" });
        return;
      }

      res.json(updatedItem);
    } catch (error) {
      console.error("Error updating item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.itemService.delete(id);

      if (!deleted) {
        res.status(404).json({ error: "Item not found" });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
