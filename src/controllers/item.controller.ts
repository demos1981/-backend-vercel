import { Request, Response } from "express";
import { ItemService } from "../services/item.service";
import {
  ICreateItemDto,
  IUpdateItemDto,
  ItemStatusEnum,
  ItemSexEnum,
} from "../types/item.types";

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
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
      }

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
      const createItemDto = req.body as ICreateItemDto;

      // Validate required fields
      const requiredFields = [
        "articles",
        "brand",
        "name",
        "description",
        "quantity",
        "price",
        "role",
        "sex",
        "category",
      ] as const;
      const missingFields = requiredFields.filter(
        (field) => !createItemDto[field]
      );

      if (missingFields.length > 0) {
        res.status(400).json({
          error: "Missing required fields",
          fields: missingFields,
        });
        return;
      }

      // Validate enum values
      if (!Object.values(ItemStatusEnum).includes(createItemDto.role)) {
        res.status(400).json({
          error: "Invalid role value",
          validValues: Object.values(ItemStatusEnum),
        });
        return;
      }

      if (!Object.values(ItemSexEnum).includes(createItemDto.sex)) {
        res.status(400).json({
          error: "Invalid sex value",
          validValues: Object.values(ItemSexEnum),
        });
        return;
      }

      // Validate numeric fields
      if (createItemDto.quantity < 0) {
        res.status(400).json({ error: "Quantity cannot be negative" });
        return;
      }

      if (createItemDto.price < 0) {
        res.status(400).json({ error: "Price cannot be negative" });
        return;
      }

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
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
      }

      const updateItemDto = req.body as IUpdateItemDto;

      // Validate enum values if provided
      if (
        updateItemDto.role &&
        !Object.values(ItemStatusEnum).includes(updateItemDto.role)
      ) {
        res.status(400).json({
          error: "Invalid role value",
          validValues: Object.values(ItemStatusEnum),
        });
        return;
      }

      if (
        updateItemDto.sex &&
        !Object.values(ItemSexEnum).includes(updateItemDto.sex)
      ) {
        res.status(400).json({
          error: "Invalid sex value",
          validValues: Object.values(ItemSexEnum),
        });
        return;
      }

      // Validate numeric fields if provided
      if (updateItemDto.quantity !== undefined && updateItemDto.quantity < 0) {
        res.status(400).json({ error: "Quantity cannot be negative" });
        return;
      }

      if (updateItemDto.price !== undefined && updateItemDto.price < 0) {
        res.status(400).json({ error: "Price cannot be negative" });
        return;
      }

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
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
      }

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
