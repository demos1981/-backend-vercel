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
const defaultPort = parseInt(process.env.PORT || "3001", 10);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const findAvailablePort = async (startPort) => {
    return new Promise((resolve, reject) => {
        const server = require("net").createServer();
        server.listen(startPort, () => {
            const port = server.address().port;
            server.close(() => resolve(port));
        });
        server.on("error", (err) => {
            if (err.code === "EADDRINUSE") {
                resolve(findAvailablePort(startPort + 1));
            }
            else {
                reject(err);
            }
        });
    });
};
const startServer = async () => {
    try {
        await data_source_1.AppDataSource.initialize();
        console.log("Data Source has been initialized!");
        const port = await findAvailablePort(defaultPort);
        app.listen(port, "0.0.0.0", () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error("Error during initialization:", error);
        process.exit(1);
    }
};
startServer();
app.get("/", (_req, res) => {
    res.send("Hello, server is listen you");
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
//# sourceMappingURL=index.js.map