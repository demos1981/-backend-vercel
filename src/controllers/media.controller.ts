import { Request, Response } from "express";
import { StorageService } from "../services/storage.service";
import { ItemService } from "../services/item.service";

export class MediaController {
  private storageService: StorageService;
  private itemService: ItemService;

  constructor() {
    this.storageService = new StorageService();
    this.itemService = new ItemService();
  }

  /**
   * Uploads a photo for an item
   * @param req - Express request object containing the file and item ID
   * @param res - Express response object
   */
  uploadPhoto = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }
      console.log("Отримано файл:", req.file);
      const itemId = parseInt(req.params.id);
      if (isNaN(itemId)) {
        res.status(400).json({ error: "Invalid item ID" });
        return;
      }

      // Check if item exists
      const item = await this.itemService.findById(itemId);
      if (!item) {
        res.status(404).json({ error: "Item not found" });
        return;
      }

      // Upload file to Supabase
      const photoUrl = await this.storageService.uploadFile(req.file, itemId);

      // Update item with new photo URL
      await this.itemService.update(itemId, { photoUrl });

      res.json({ photoUrl });
    } catch (error) {
      console.error("Error uploading photo:", error);
      res.status(500).json({ error: "Failed to upload photo" });
    }
  };

  /**
   * Uploads a video for an item
   * @param req - Express request object containing the file and item ID
   * @param res - Express response object
   */
  uploadVideo = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      const itemId = parseInt(req.params.id);
      if (isNaN(itemId)) {
        res.status(400).json({ error: "Invalid item ID" });
        return;
      }

      // Check if item exists
      const item = await this.itemService.findById(itemId);
      if (!item) {
        res.status(404).json({ error: "Item not found" });
        return;
      }

      // Upload file to Supabase
      const videoUrl = await this.storageService.uploadFile(req.file, itemId);

      // Update item with new video URL
      await this.itemService.update(itemId, { videoUrl });

      res.json({ videoUrl });
    } catch (error) {
      console.error("Error uploading video:", error);
      res.status(500).json({ error: "Failed to upload video" });
    }
  };

  /**
   * Deletes a photo from an item
   * @param req - Express request object containing the item ID
   * @param res - Express response object
   */
  deletePhoto = async (req: Request, res: Response): Promise<void> => {
    try {
      const itemId = parseInt(req.params.id);
      if (isNaN(itemId)) {
        res.status(400).json({ error: "Invalid item ID" });
        return;
      }

      // Get item to check if it exists and has a photo
      const item = await this.itemService.findById(itemId);
      if (!item) {
        res.status(404).json({ error: "Item not found" });
        return;
      }

      if (!item.photoUrl) {
        res.status(404).json({ error: "No photo found for this item" });
        return;
      }

      // Delete file from Supabase
      await this.storageService.deleteFile(item.photoUrl);

      // Update item to remove photo URL
      await this.itemService.update(itemId, { photoUrl: null });

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting photo:", error);
      res.status(500).json({ error: "Failed to delete photo" });
    }
  };

  /**
   * Deletes a video from an item
   * @param req - Express request object containing the item ID
   * @param res - Express response object
   */
  deleteVideo = async (req: Request, res: Response): Promise<void> => {
    try {
      const itemId = parseInt(req.params.id);
      if (isNaN(itemId)) {
        res.status(400).json({ error: "Invalid item ID" });
        return;
      }

      // Get item to check if it exists and has a video
      const item = await this.itemService.findById(itemId);
      if (!item) {
        res.status(404).json({ error: "Item not found" });
        return;
      }

      if (!item.videoUrl) {
        res.status(404).json({ error: "No video found for this item" });
        return;
      }

      // Delete file from Supabase
      await this.storageService.deleteFile(item.videoUrl);

      // Update item to remove video URL
      await this.itemService.update(itemId, { videoUrl: null });

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting video:", error);
      res.status(500).json({ error: "Failed to delete video" });
    }
  };
}
