"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const checkSupabaseConnection_1 = require("../utils/checkSupabaseConnection");
class StorageService {
    async uploadFile(file, itemId) {
        try {
            const fileExt = file.originalname.split(".").pop();
            const fileName = `${itemId}/${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;
            const { error: uploadError } = await checkSupabaseConnection_1.supabase.storage
                .from(checkSupabaseConnection_1.bucketName)
                .upload(filePath, file.buffer, {
                contentType: file.mimetype,
                cacheControl: "3600",
                upsert: false,
            });
            if (uploadError) {
                console.error("Помилка при завантаженні файлу:", uploadError.message);
                throw new Error("Не вдалося завантажити файл у Supabase.");
            }
            const { data: { publicUrl }, } = checkSupabaseConnection_1.supabase.storage.from(checkSupabaseConnection_1.bucketName).getPublicUrl(filePath);
            return publicUrl;
        }
        catch (error) {
            console.error("Error uploading file:", error);
            throw new Error("Failed to upload file");
        }
    }
    async deleteFile(fileUrl) {
        try {
            const urlParts = fileUrl.split(`${checkSupabaseConnection_1.bucketName}/`);
            const filePath = urlParts[1];
            if (!filePath) {
                throw new Error("Invalid file URL — шлях до файлу не знайдено.");
            }
            const { error } = await checkSupabaseConnection_1.supabase.storage
                .from(checkSupabaseConnection_1.bucketName)
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