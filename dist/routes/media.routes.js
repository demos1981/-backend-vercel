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
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith("image/") ||
            file.mimetype.startsWith("video/")) {
            cb(null, true);
        }
        else {
            cb(new Error("Invalid file type. Only images and videos are allowed."));
        }
    },
});
router.post("/media/:id/photo", upload.single("photo"), mediaController.uploadPhoto);
router.delete("/media/:id/photo", mediaController.deletePhoto);
router.post("/media/:id/video", upload.single("video"), mediaController.uploadVideo);
router.delete("/media/:id/video", mediaController.deleteVideo);
exports.default = router;
//# sourceMappingURL=media.routes.js.map