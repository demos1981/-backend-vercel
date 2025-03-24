"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const item_routes_1 = __importDefault(require("./routes/item.routes"));
const media_routes_1 = __importDefault(require("./routes/media.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", item_routes_1.default);
app.use("/api", media_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map