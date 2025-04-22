"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSupabaseConnection = exports.bucketName = exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ROLE_KEY;
if (!supabaseUrl) {
    throw new Error("Missing SUPABASE_URL environment variable");
}
if (!supabaseKey) {
    throw new Error("Missing SUPABASE_ANON_KEY environment variable");
}
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: false,
    },
    db: {
        schema: "public",
    },
    global: {
        headers: {
            "x-my-custom-header": "my-app-name",
        },
    },
});
exports.bucketName = process.env.SUPABASE_BUCKET;
const checkSupabaseConnection = async () => {
    try {
        const { data: existingBuckets, error: listError } = await exports.supabase.storage.listBuckets();
        if (listError) {
            console.error("Error listing buckets:", listError);
            return false;
        }
        const bucketExists = existingBuckets.some((bucket) => bucket.name === exports.bucketName);
        if (!bucketExists) {
            console.log(`Storage bucket "${exports.bucketName}" not found. Please create it in the Supabase dashboard.`);
            console.log("1. Go to your Supabase project dashboard");
            console.log("2. Navigate to Storage in the left sidebar");
            console.log("3. Click 'Create a new bucket'");
            console.log(`4. Name it "${exports.bucketName}"`);
            console.log("5. Set it as public");
            return false;
        }
        console.log("Supabase connection successful");
        return true;
    }
    catch (error) {
        console.error("Supabase connection failed:", error);
        return false;
    }
};
exports.checkSupabaseConnection = checkSupabaseConnection;
//# sourceMappingURL=checkSupabaseConnection.js.map