import { Router } from "express";
import { MediaController } from "../controllers/media.controller";
import multer from "multer";

const router = Router();
const mediaController = new MediaController();

// Налаштування Multer для обробки завантаження файлів
const storage = multer.memoryStorage(); // Зберігаємо файл в пам'яті, щоб потім передати його до Supabase
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB ліміт файлу
});

// Маршрути для завантаження та видалення медіа
router.post(
  "/items/:id/photo",
  upload.single("file"),
  mediaController.uploadPhoto
);
router.post(
  "/items/:id/video",
  upload.single("file"),
  mediaController.uploadVideo
);
router.delete("/items/:id/photo", mediaController.deletePhoto);
router.delete("/items/:id/video", mediaController.deleteVideo);

export default router;
