"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./config/data-source");
const item_routes_1 = __importDefault(require("./routes/item.routes"));
const media_routes_1 = __importDefault(require("./routes/media.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const dotenv_1 = __importDefault(require("dotenv"));
const net_1 = require("net");
const speed_insights_1 = require("@vercel/speed-insights");
dotenv_1.default.config();
(0, speed_insights_1.injectSpeedInsights)();
const app = (0, express_1.default)();
const defaultPort = parseInt(process.env.PORT || "3000", 10);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/items", item_routes_1.default);
app.use("/api", media_routes_1.default);
app.get("/", (_req, res) => {
    res.send("Hello, server is listen you gays!");
});
app.use(error_middleware_1.errorHandler);
const isPortInUse = (port) => {
    return new Promise((resolve) => {
        const server = (0, net_1.createServer)()
            .listen(port, () => {
            server.close();
            resolve(false);
        })
            .on("error", () => {
            resolve(true);
        });
    });
};
const findAvailablePort = async (startPort) => {
    let port = startPort;
    while (await isPortInUse(port)) {
        port++;
    }
    return port;
};
const startServer = async () => {
    try {
        await data_source_1.AppDataSource.initialize();
        console.log("Data Source has been initialized!");
        const port = await findAvailablePort(defaultPort);
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error("Error during initialization:", error);
        process.exit(1);
    }
};
startServer();
exports.default = app;
//# sourceMappingURL=index.js.map