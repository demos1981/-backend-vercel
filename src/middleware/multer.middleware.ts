import multer from "multer";
const storage = multer.memoryStorage();
// Зберігаємо файл у памʼяті (buffer), не на диску
export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB ліміт файлу
});
