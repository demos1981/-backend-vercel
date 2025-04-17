/**
 * MediaController - клас, який відповідає за управління медіафайлами (фото та відео) для елементів системи.
 * Використовує сервіси для роботи з файловим сховищем та елементами бази даних.
 */
import { Request, Response } from "express";
import { StorageService } from "../services/storage.service";
import { ItemService } from "../services/item.service";

export class MediaController {
  private storageService: StorageService; // Сервіс для роботи з файловим сховищем (Supabase)
  private itemService: ItemService; // Сервіс для роботи з елементами бази даних

  /**
   * Ініціалізує сервіси, необхідні для управління медіафайлами
   */
  constructor() {
    this.storageService = new StorageService();
    this.itemService = new ItemService();
  }

  /**
   * Отримує всі медіафайли, пов'язані з елементом за його ID
   * @param req - Об'єкт запиту з параметром id
   * @param res - Об'єкт відповіді
   */
  getItemMedia = async (req: Request, res: Response): Promise<void> => {
    try {
      const itemId = parseInt(req.params.id);
      if (isNaN(itemId)) {
        res.status(400).json({ error: "Invalid item ID" });
        return;
      }

      const media = await this.itemService.getItemMedia(itemId);

      if (!media) {
        res.status(404).json({ error: "Item not found" });
        return;
      }

      res.json(media); // Повертає об'єкт з медіафайлами елемента
    } catch (error) {
      console.error("Error getting item media:", error);
      res.status(500).json({ error: "Failed to get item media" });
    }
  };

  /**
   * Завантажує фотографію для елемента
   * @param req - Express request object containing the file and item ID
   * @param res - Express response object
   */
  uploadPhoto = async (req: Request, res: Response): Promise<void> => {
    try {
      // Перевірка наявності файлу в запиті
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }
      console.log("Отримано файл:", req.file); // Лог для відстеження отриманого файлу

      // Перевірка валідності ID елемента
      const itemId = parseInt(req.params.id);
      if (isNaN(itemId)) {
        res.status(400).json({ error: "Invalid item ID" });
        return;
      }

      // Перевірка існування елемента
      const item = await this.itemService.findById(itemId);
      if (!item) {
        res.status(404).json({ error: "Item not found" });
        return;
      }

      // Завантаження файлу в Supabase
      const photoUrl = await this.storageService.uploadFile(req.file, itemId);

      // Оновлення елемента з новим URL фотографії
      await this.itemService.update(itemId, { photoUrl });

      res.json({ photoUrl }); // Повертає URL завантаженої фотографії
    } catch (error) {
      console.error("Error uploading photo:", error);
      res.status(500).json({ error: "Failed to upload photo" });
    }
  };

  /**
   * Завантажує відео для елемента
   * @param req - Express request object containing the file and item ID
   * @param res - Express response object
   */
  uploadVideo = async (req: Request, res: Response): Promise<void> => {
    try {
      // Перевірка наявності файлу в запиті
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      // Перевірка валідності ID елемента
      const itemId = parseInt(req.params.id);
      if (isNaN(itemId)) {
        res.status(400).json({ error: "Invalid item ID" });
        return;
      }

      // Перевірка існування елемента
      const item = await this.itemService.findById(itemId);
      if (!item) {
        res.status(404).json({ error: "Item not found" });
        return;
      }

      // Завантаження файлу в Supabase
      const videoUrl = await this.storageService.uploadFile(req.file, itemId);

      // Оновлення елемента з новим URL відео
      await this.itemService.update(itemId, { videoUrl });

      res.json({ videoUrl }); // Повертає URL завантаженого відео
    } catch (error) {
      console.error("Error uploading video:", error);
      res.status(500).json({ error: "Failed to upload video" });
    }
  };

  /**
   * Видаляє фотографію елемента
   * @param req - Express request object containing the item ID
   * @param res - Express response object
   */
  deletePhoto = async (req: Request, res: Response): Promise<void> => {
    try {
      // Перевірка валідності ID елемента
      const itemId = parseInt(req.params.id);
      if (isNaN(itemId)) {
        res.status(400).json({ error: "Invalid item ID" });
        return;
      }

      // Отримання елемента для перевірки існування та наявності фотографії
      const item = await this.itemService.findById(itemId);
      if (!item) {
        res.status(404).json({ error: "Item not found" });
        return;
      }

      if (!item.photoUrl) {
        res.status(404).json({ error: "No photo found for this item" });
        return;
      }

      // Видалення файлу з Supabase
      await this.storageService.deleteFile(item.photoUrl);

      // Оновлення елемента для видалення URL фотографії
      await this.itemService.update(itemId, { photoUrl: null });

      res.status(204).send(); // Успішне виконання без контенту
    } catch (error) {
      console.error("Error deleting photo:", error);
      res.status(500).json({ error: "Failed to delete photo" });
    }
  };

  /**
   * Видаляє відео елемента
   * @param req - Express request object containing the item ID
   * @param res - Express response object
   */
  deleteVideo = async (req: Request, res: Response): Promise<void> => {
    try {
      // Перевірка валідності ID елемента
      const itemId = parseInt(req.params.id);
      if (isNaN(itemId)) {
        res.status(400).json({ error: "Invalid item ID" });
        return;
      }

      // Отримання елемента для перевірки існування та наявності відео
      const item = await this.itemService.findById(itemId);
      if (!item) {
        res.status(404).json({ error: "Item not found" });
        return;
      }

      if (!item.videoUrl) {
        res.status(404).json({ error: "No video found for this item" });
        return;
      }

      // Видалення файлу з Supabase
      await this.storageService.deleteFile(item.videoUrl);

      // Оновлення елемента для видалення URL відео
      await this.itemService.update(itemId, { videoUrl: null });

      res.status(204).send(); // Успішне виконання без контенту
    } catch (error) {
      console.error("Error deleting video:", error);
      res.status(500).json({ error: "Failed to delete video" });
    }
  };
}
