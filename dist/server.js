"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = require("./config/data-source");
const supabase_config_1 = require("./config/supabase.config");
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.SUPABASE_PORT || 5000;
data_source_1.AppDataSource.initialize()
    .then(async () => {
    const isSupabaseConnected = await (0, supabase_config_1.checkSupabaseConnection)();
    if (!isSupabaseConnected) {
        console.error("Failed to connect to Supabase");
        process.exit(1);
    }
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error("Error during Data Source initialization:", error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map