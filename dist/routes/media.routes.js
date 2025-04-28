"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const media_controller_1 = require("../controllers/media.controller");
const multer_middleware_1 = require("../middleware/multer.middleware");
const router = express_1.default.Router();
const mediaController = new media_controller_1.MediaController();
router.post("/:id/photo", multer_middleware_1.upload.single("photo"), mediaController.uploadPhoto);
router.get("/:id/photo", mediaController.getItemMedia);
router.post("/:id/video", multer_middleware_1.upload.single("video"), mediaController.uploadVideo);
router.delete("/:id/photo", mediaController.deletePhoto);
router.delete("/:id/video", mediaController.deleteVideo);
exports.default = router;
//# sourceMappingURL=media.routes.js.map