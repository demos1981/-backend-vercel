/**
 * Маршрути для роботи з медіафайлами
 *
 * Цей файл визначає маршрути API для отримання, завантаження та видалення
 * медіафайлів (фото та відео) для елементів у системі
 */
import express, { Router } from "express";
import { MediaController } from "../controllers/media.controller";
import { upload } from "../middleware/multer.middleware";

// Створення маршрутизатора Express
const router: Router = express.Router();

// Ініціалізація контролера для обробки запитів на медіафайли
const mediaController = new MediaController();

/**
 * GET /items/:id/media
 * Отримання медіафайлів (URL фото та відео) для конкретного елемента за його ID
 */
router.get("/items/:id/media", mediaController.getItemMedia);

/**
 * POST /items/:id/photo
 * Завантаження фото для елемента
 * Використовує middleware multer для обробки файлу з поля "photo"
 */
router.post(
  "/items/:id/photo",
  upload.single("photo"), // Middleware для обробки одного файлу з поля "photo"
  mediaController.uploadPhoto // Обробник завантаження фото
);

/**
 * POST /items/:id/video
 * Завантаження відео для елемента
 * Використовує middleware multer для обробки файлу з поля "video"
 */
router.post(
  "/items/:id/video",
  upload.single("video"), // Middleware для обробки одного файлу з поля "video"
  mediaController.uploadVideo // Обробник завантаження відео
);

/**
 * DELETE /items/:id/photo
 * Видалення фотографії для елемента за його ID
 */
router.delete("/items/:id/photo", mediaController.deletePhoto);

/**
 * DELETE /items/:id/video
 * Видалення відео для елемента за його ID
 */
router.delete("/items/:id/video", mediaController.deleteVideo);

export default router;
