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
            await supabase_config_1.supabase.storage.from(supabase_config_1.bucketName).upload(filePath, file.buffer, {
                contentType: file.mimetype,
                cacheControl: "3600",
                upsert: false,
            });
            const { data: { publicUrl }, } = supabase_config_1.supabase.storage.from(supabase_config_1.bucketName).getPublicUrl(filePath);
            return publicUrl;
        }
        catch (error) {
            console.error("Error uploading file:", error);
            throw new Error("Failed to upload file");
        }
    }
    async deleteFile(fileUrl) {
        try {
            const urlParts = fileUrl.split(`${supabase_config_1.bucketName}/`);
            const filePath = urlParts[1];
            if (!filePath) {
                throw new Error("Invalid file URL — шлях до файлу не знайдено.");
            }
            const { error } = await supabase_config_1.supabase.storage
                .from(supabase_config_1.bucketName)
                .remove([filePath]);
            if (error) {
                console.error("Помилка при видаленні файлу з Supabase:", error.message);
                throw new Error("Не вдалося видалити файл.");
            }
        }
        catch (error) {
            console.error("Помилка в deleteFile:", error);
            throw new Error("Не вдалося видалити файл.");
        }
    }
}
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map