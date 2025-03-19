"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemController = void 0;
const item_service_1 = require("../services/item.service");
class ItemController {
    constructor() {
        this.getAll = async (_req, res) => {
            try {
                const items = await this.itemService.findAll();
                res.json(items);
            }
            catch (error) {
                console.error("Error fetching items:", error);
                res.status(500).json({ error: "Internal server error" });
            }
        };
        this.getById = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const item = await this.itemService.findById(id);
                if (!item) {
                    res.status(404).json({ error: "Item not found" });
                    return;
                }
                res.json(item);
            }
            catch (error) {
                console.error("Error fetching item:", error);
                res.status(500).json({ error: "Internal server error" });
            }
        };
        this.create = async (req, res) => {
            try {
                const createItemDto = req.body;
                const newItem = await this.itemService.create(createItemDto);
                res.status(201).json(newItem);
            }
            catch (error) {
                console.error("Error creating item:", error);
                res.status(500).json({ error: "Internal server error" });
            }
        };
        this.update = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const updateItemDto = req.body;
                const updatedItem = await this.itemService.update(id, updateItemDto);
                if (!updatedItem) {
                    res.status(404).json({ error: "Item not found" });
                    return;
                }
                res.json(updatedItem);
            }
            catch (error) {
                console.error("Error updating item:", error);
                res.status(500).json({ error: "Internal server error" });
            }
        };
        this.delete = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const deleted = await this.itemService.delete(id);
                if (!deleted) {
                    res.status(404).json({ error: "Item not found" });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                console.error("Error deleting item:", error);
                res.status(500).json({ error: "Internal server error" });
            }
        };
        this.itemService = new item_service_1.ItemService();
    }
}
exports.ItemController = ItemController;
//# sourceMappingURL=item.controller.js.map