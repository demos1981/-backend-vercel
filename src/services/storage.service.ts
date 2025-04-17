/**
 * Сервіс для роботи з файловим сховищем Supabase
 * Забезпечує функціональність завантаження та видалення файлів
 */
import { supabase, bucketName } from "../config/supabase.config";

export class StorageService {
  /**
   * Завантажує файл у сховище Supabase
   * @param file - Об'єкт файлу, отриманий через Multer middleware
   * @param itemId - Ідентифікатор товару, для якого завантажується файл
   * @returns Promise з публічним URL завантаженого файлу
   * @throws Error у випадку невдалого завантаження
   */
  async uploadFile(file: Express.Multer.File, itemId: number): Promise<string> {
    try {
      // Отримання розширення файлу з оригінальної назви
      const fileExt = file.originalname.split(".").pop();

      // Формування унікальної назви файлу з використанням ID товару та часової мітки
      const fileName = `${itemId}/${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Завантаження файлу в Supabase сховище
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype, // Встановлення правильного MIME-типу
          cacheControl: "3600", // Кешування на 1 годину
          upsert: false, // Не перезаписувати існуючі файли
        });

      // Обробка помилки завантаження
      if (uploadError) {
        console.error("Помилка при завантаженні файлу:", uploadError.message);
        throw new Error("Не вдалося завантажити файл у Supabase.");
      }

      // Отримання публічного URL для завантаженого файлу
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucketName).getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("Failed to upload file");
    }
  }

  /**
   * Видаляє файл зі сховища Supabase за його URL
   * @param fileUrl - Публічний URL файлу, який потрібно видалити
   * @returns Promise без значення у випадку успішного видалення
   * @throws Error у випадку невдалого видалення або неправильного URL
   */
  async deleteFile(fileUrl: string): Promise<void> {
    try {
      // Розбір URL для отримання шляху до файлу в сховищі
      const urlParts = fileUrl.split(`${bucketName}/`);
      const filePath = urlParts[1];

      // Перевірка коректності шляху
      if (!filePath) {
        throw new Error("Invalid file URL — шлях до файлу не знайдено.");
      }

      // Видалення файлу зі сховища
      const { error } = await supabase.storage
        .from(bucketName)
        .remove([filePath]);

      // Обробка помилки видалення
      if (error) {
        console.error("Помилка при видаленні файлу з Supabase:", error.message);
        throw new Error("Не вдалося видалити файл.");
      }
    } catch (error) {
      console.error("Помилка в deleteFile:", error);
      throw new Error("Не вдалося видалити файл.");
    }
  }
}
