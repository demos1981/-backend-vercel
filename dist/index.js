"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const hpp_1 = __importDefault(require("hpp"));
const data_source_1 = require("./config/data-source");
const item_routes_1 = __importDefault(require("./routes/item.routes"));
const media_routes_1 = __importDefault(require("./routes/media.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const dotenv_1 = __importDefault(require("dotenv"));
const net_1 = require("net");
const speed_insights_1 = require("@vercel/speed-insights");
const checkSupabaseConnection_1 = require("./utils/checkSupabaseConnection");
const helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config();
(0, speed_insights_1.injectSpeedInsights)();
const app = (0, express_1.default)();
const defaultPort = parseInt(process.env.PORT || "3000", 10);
const loggerMiddleware = (0, morgan_1.default)("dev");
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)());
app.use((0, hpp_1.default)());
app.use(body_parser_1.default.json());
app.use(loggerMiddleware);
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
        const isSupabaseConnected = await (0, checkSupabaseConnection_1.checkSupabaseConnection)();
        if (!isSupabaseConnected) {
            console.error("❌ Failed to connect to Supabase");
            process.exit(1);
        }
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