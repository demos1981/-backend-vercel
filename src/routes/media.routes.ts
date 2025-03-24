import { Router } from "express";
import { MediaController } from "../controllers/media.controller";
import multer from "multer";

const router = Router();
const mediaController = new MediaController();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (_req, file, cb) => {
    // Accept images and videos only
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images and videos are allowed."));
    }
  },
});

// Photo routes
router.post(
  "/items/:id/photo",
  upload.single("photo"),
  mediaController.uploadPhoto
);
router.delete("/items/:id/photo", mediaController.deletePhoto);

// Video routes
router.post(
  "/items/:id/video",
  upload.single("video"),
  mediaController.uploadVideo
);
router.delete("/items/:id/video", mediaController.deleteVideo);

export default router;
