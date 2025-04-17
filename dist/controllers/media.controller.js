"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const storage_service_1 = require("../services/storage.service");
const item_service_1 = require("../services/item.service");
class MediaController {
    constructor() {
        this.getItemMedia = async (req, res) => {
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
                res.json(media);
            }
            catch (error) {
                console.error("Error getting item media:", error);
                res.status(500).json({ error: "Failed to get item media" });
            }
        };
        this.uploadPhoto = async (req, res) => {
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
                const item = await this.itemService.findById(itemId);
                if (!item) {
                    res.status(404).json({ error: "Item not found" });
                    return;
                }
                const photoUrl = await this.storageService.uploadFile(req.file, itemId);
                await this.itemService.update(itemId, { photoUrl });
                res.json({ photoUrl });
            }
            catch (error) {
                console.error("Error uploading photo:", error);
                res.status(500).json({ error: "Failed to upload photo" });
            }
        };
        this.uploadVideo = async (req, res) => {
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
                const item = await this.itemService.findById(itemId);
                if (!item) {
                    res.status(404).json({ error: "Item not found" });
                    return;
                }
                const videoUrl = await this.storageService.uploadFile(req.file, itemId);
                await this.itemService.update(itemId, { videoUrl });
                res.json({ videoUrl });
            }
            catch (error) {
                console.error("Error uploading video:", error);
                res.status(500).json({ error: "Failed to upload video" });
            }
        };
        this.deletePhoto = async (req, res) => {
            try {
                const itemId = parseInt(req.params.id);
                if (isNaN(itemId)) {
                    res.status(400).json({ error: "Invalid item ID" });
                    return;
                }
                const item = await this.itemService.findById(itemId);
                if (!item) {
                    res.status(404).json({ error: "Item not found" });
                    return;
                }
                if (!item.photoUrl) {
                    res.status(404).json({ error: "No photo found for this item" });
                    return;
                }
                await this.storageService.deleteFile(item.photoUrl);
                await this.itemService.update(itemId, { photoUrl: null });
                res.status(204).send();
            }
            catch (error) {
                console.error("Error deleting photo:", error);
                res.status(500).json({ error: "Failed to delete photo" });
            }
        };
        this.deleteVideo = async (req, res) => {
            try {
                const itemId = parseInt(req.params.id);
                if (isNaN(itemId)) {
                    res.status(400).json({ error: "Invalid item ID" });
                    return;
                }
                const item = await this.itemService.findById(itemId);
                if (!item) {
                    res.status(404).json({ error: "Item not found" });
                    return;
                }
                if (!item.videoUrl) {
                    res.status(404).json({ error: "No video found for this item" });
                    return;
                }
                await this.storageService.deleteFile(item.videoUrl);
                await this.itemService.update(itemId, { videoUrl: null });
                res.status(204).send();
            }
            catch (error) {
                console.error("Error deleting video:", error);
                res.status(500).json({ error: "Failed to delete video" });
            }
        };
        this.storageService = new storage_service_1.StorageService();
        this.itemService = new item_service_1.ItemService();
    }
}
exports.MediaController = MediaController;
//# sourceMappingURL=media.controller.js.map