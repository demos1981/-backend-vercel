"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemController = void 0;
const AppError_1 = require("../utils/AppError");
const item_service_1 = require("../services/item.service");
const enums_1 = require("../types/enums");
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
        this.getMenItems = async (_req, res) => {
            try {
                const menItems = await this.itemService.findMenItems();
                res.status(200).json(menItems);
            }
            catch (error) {
                console.error("Error fetching men items:", error);
                res.status(500).json({ error: "Server error" });
            }
        };
        this.getById = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    res.status(400).json({ error: "Invalid ID format" });
                    return;
                }
                const item = await this.itemService.findById(id);
                if (!item) {
                    throw new AppError_1.AppError(`Item with ID ${id} not found`, 404);
                }
                res.json({
                    id: item.id,
                    name: item.name,
                    photoUrl: item.photoUrl,
                    videoUrl: item.videoUrl,
                });
            }
            catch (error) {
                console.error("Error fetching item:", error);
                res.status(500).json({ error: "Internal server error" });
            }
        };
        this.create = async (req, res) => {
            try {
                const createItemDto = req.body;
                const requiredFields = [
                    "articles",
                    "brand",
                    "name",
                    "description",
                    "quantity",
                    "price",
                    "role",
                    "sex",
                    "category",
                ];
                const missingFields = requiredFields.filter((field) => !createItemDto[field]);
                if (missingFields.length > 0) {
                    res.status(400).json({
                        error: "Missing required fields",
                        fields: missingFields,
                    });
                    return;
                }
                if (!Object.values(enums_1.ItemStatusEnum).includes(createItemDto.role)) {
                    res.status(400).json({
                        error: "Invalid role value",
                        validValues: Object.values(enums_1.ItemStatusEnum),
                    });
                    return;
                }
                if (!Object.values(enums_1.ItemSexEnum).includes(createItemDto.sex)) {
                    res.status(400).json({
                        error: "Invalid sex value",
                        validValues: Object.values(enums_1.ItemSexEnum),
                    });
                    return;
                }
                if (createItemDto.quantity < 0) {
                    res.status(400).json({ error: "Quantity cannot be negative" });
                    return;
                }
                if (createItemDto.price < 0) {
                    res.status(400).json({ error: "Price cannot be negative" });
                    return;
                }
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
                if (isNaN(id)) {
                    res.status(400).json({ error: "Invalid ID format" });
                    return;
                }
                const updateItemDto = req.body;
                if (updateItemDto.role &&
                    !Object.values(enums_1.ItemStatusEnum).includes(updateItemDto.role)) {
                    res.status(400).json({
                        error: "Invalid role value",
                        validValues: Object.values(enums_1.ItemStatusEnum),
                    });
                    return;
                }
                if (updateItemDto.sex &&
                    !Object.values(enums_1.ItemSexEnum).includes(updateItemDto.sex)) {
                    res.status(400).json({
                        error: "Invalid sex value",
                        validValues: Object.values(enums_1.ItemSexEnum),
                    });
                    return;
                }
                if (updateItemDto.quantity !== undefined && updateItemDto.quantity < 0) {
                    res.status(400).json({ error: "Quantity cannot be negative" });
                    return;
                }
                if (updateItemDto.price !== undefined && updateItemDto.price < 0) {
                    res.status(400).json({ error: "Price cannot be negative" });
                    return;
                }
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
                if (isNaN(id)) {
                    res.status(400).json({ error: "Invalid ID format" });
                    return;
                }
                const deleted = await this.itemService.remove(id);
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