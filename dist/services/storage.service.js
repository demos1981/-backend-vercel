"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const supabase_config_1 = require("../config/supabase.config");
class StorageService {
    async uploadFile(file, itemId) {
        try {
            const fileExt = file.originalname.split(".").pop();
            const fileName = `${itemId}/${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;
            await supabase_config_1.supabase.storage
                .from(supabase_config_1.STORAGE_BUCKET_NAME)
                .upload(filePath, file.buffer, {
                contentType: file.mimetype,
                cacheControl: "3600",
                upsert: false,
            });
            const { data: { publicUrl }, } = supabase_config_1.supabase.storage.from(supabase_config_1.STORAGE_BUCKET_NAME).getPublicUrl(filePath);
            return publicUrl;
        }
        catch (error) {
            console.error("Error uploading file:", error);
            throw new Error("Failed to upload file");
        }
    }
    async deleteFile(fileUrl) {
        try {
            const filePath = fileUrl.split("/").pop();
            if (!filePath) {
                throw new Error("Invalid file URL");
            }
            await supabase_config_1.supabase.storage.from(supabase_config_1.STORAGE_BUCKET_NAME).remove([filePath]);
        }
        catch (error) {
            console.error("Error deleting file:", error);
            throw new Error("Failed to delete file");
        }
    }
}
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map