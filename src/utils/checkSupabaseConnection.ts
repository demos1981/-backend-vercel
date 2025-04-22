/**
 * Конфігурація Supabase для взаємодії з сервісами зберігання даних
 *
 * Цей файл налаштовує з'єднання з Supabase для бекенд-взаємодії
 * та експортує необхідні об'єкти для роботи з базою даних і файловим сховищем
 */
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Завантаження змінних середовища з .env файлу
dotenv.config();

// Отримання облікових даних Supabase зі змінних середовища
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ROLE_KEY;

// Валідація змінних середовища для запобігання помилок з'єднання
if (!supabaseUrl) {
  throw new Error("Missing SUPABASE_URL environment variable");
}

if (!supabaseKey) {
  throw new Error("Missing SUPABASE_ANON_KEY environment variable");
}

/**
 * Створення клієнта Supabase з налаштованою конфігурацією
 * - persistSession: false - оскільки це серверна служба, сесії не зберігаються
 * - schema: "public" - використовується публічна схема бази даних
 * - headers: користувацькі заголовки для ідентифікації додатка
 */
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false, // Оскільки це бекенд-сервіс, не потрібно зберігати сесії
  },
  db: {
    schema: "public", // Використання публічної схеми бази даних
  },
  global: {
    headers: {
      "x-my-custom-header": "my-app-name", // Користувацький заголовок для ідентифікації запитів
    },
  },
});

/**
 * Назва бакету (сховища) Supabase для зберігання файлів
 * Отримується зі змінних середовища
 */
export const bucketName: string = process.env.SUPABASE_BUCKET as string;

/**
 * Допоміжна функція для перевірки з'єднання з Supabase
 * Перевіряє з'єднання та наявність необхідного бакету для зберігання файлів
 *
 * @returns Promise<boolean> - true, якщо з'єднання успішне і бакет існує, false - інакше
 */

export const checkSupabaseConnection = async () => {
  try {
    // Спочатку спробуємо отримати список бакетів для перевірки з'єднання
    const { data: existingBuckets, error: listError } =
      await supabase.storage.listBuckets();

    if (listError) {
      console.error("Error listing buckets:", listError);
      return false;
    }

    // Перевірка, чи існує необхідний бакет
    const bucketExists = existingBuckets.some(
      (bucket) => bucket.name === bucketName
    );

    if (!bucketExists) {
      // Виведення інструкцій зі створення бакету, якщо він не існує
      console.log(
        `Storage bucket "${bucketName}" not found. Please create it in the Supabase dashboard.`
      );
      console.log("1. Go to your Supabase project dashboard");
      console.log("2. Navigate to Storage in the left sidebar");
      console.log("3. Click 'Create a new bucket'");
      console.log(`4. Name it "${bucketName}"`);
      console.log("5. Set it as public");
      return false;
    }

    // Успішне з'єднання і перевірка бакету
    console.log("Supabase connection successful");
    return true;
  } catch (error) {
    // Обробка помилок з'єднання
    console.error("Supabase connection failed:", error);
    return false;
  }
};
