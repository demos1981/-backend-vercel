"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./config/data-source");
const Item_1 = require("./entities/Item");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((error) => console.log("Error during Data Source initialization:", error));
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
});
app.get("/api/items", async (_req, res) => {
    try {
        const itemRepository = data_source_1.AppDataSource.getRepository(Item_1.Item);
        const items = await itemRepository.find();
        res.json(items);
    }
    catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.post("/api/items", async (req, res) => {
    try {
        const itemRepository = data_source_1.AppDataSource.getRepository(Item_1.Item);
        const newItem = itemRepository.create(req.body);
        const result = await itemRepository.save(newItem);
        res.status(201).json(result);
    }
    catch (error) {
        console.error("Error creating item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.get("/api/items/:id", async (req, res) => {
    try {
        const itemRepository = data_source_1.AppDataSource.getRepository(Item_1.Item);
        const item = await itemRepository.findOneBy({
            id: parseInt(req.params.id),
        });
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
});
app.put("/api/items/:id", async (req, res) => {
    try {
        const itemRepository = data_source_1.AppDataSource.getRepository(Item_1.Item);
        const item = await itemRepository.findOneBy({
            id: parseInt(req.params.id),
        });
        if (!item) {
            res.status(404).json({ error: "Item not found" });
            return;
        }
        itemRepository.merge(item, req.body);
        const result = await itemRepository.save(item);
        res.json(result);
    }
    catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.delete("/api/items/:id", async (req, res) => {
    try {
        const itemRepository = data_source_1.AppDataSource.getRepository(Item_1.Item);
        const item = await itemRepository.findOneBy({
            id: parseInt(req.params.id),
        });
        if (!item) {
            res.status(404).json({ error: "Item not found" });
            return;
        }
        await itemRepository.remove(item);
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map