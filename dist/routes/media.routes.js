"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const media_controller_1 = require("../controllers/media.controller");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const mediaController = new media_controller_1.MediaController();
router.get("/items/:id/media", mediaController.getItemMedia);
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
});
router.post("/items/:id/photo", upload.single("file"), mediaController.uploadPhoto);
router.post("/items/:id/video", upload.single("file"), mediaController.uploadVideo);
router.delete("/items/:id/photo", mediaController.deletePhoto);
router.delete("/items/:id/video", mediaController.deleteVideo);
exports.default = router;
//# sourceMappingURL=media.routes.js.map