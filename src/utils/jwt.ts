/**
 * Імпортує бібліотеку jsonwebtoken для роботи з JWT токенами.
 * JWT (JSON Web Token) використовується для безпечної передачі інформації між сторонами.
 */
import jwt from "jsonwebtoken";

/**
 * Імпортує тип UserPayload з файлу user.types.
 * UserPayload - це тип даних, що містить інформацію про користувача,
 * яка буде зашифрована в токенах.
 */
import { UserPayload } from "src/types/user.types";

/**
 * ACCESS_SECRET - секретний ключ для підпису токенів доступу.
 * Отримується з змінних середовища (environment variables).
 * Оператор '!' вказує TypeScript, що значення гарантовано існує.
 */
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;

/**
 * REFRESH_SECRET - секретний ключ для підпису токенів оновлення.
 * Отримується з змінних середовища (environment variables).
 * Оператор '!' вказує TypeScript, що значення гарантовано існує.
 */
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;

/**
 * Функція для генерації токена доступу.
 *
 * @param payload - Дані користувача, які будуть зашифровані в токені
 * @returns Рядок, що містить підписаний JWT токен доступу
 *
 * Токен має термін дії 15 хвилин, після чого стає недійсним.
 */
export const generateAccessToken = (payload: UserPayload): string => {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
};

/**
 * Функція для генерації токена оновлення.
 *
 * @param payload - Дані користувача, які будуть зашифровані в токені
 * @returns Рядок, що містить підписаний JWT токен оновлення
 *
 * Токен має термін дії 7 днів, після чого стає недійсним.
 * Використовується для отримання нового токена доступу після його закінчення.
 */
export const generateRefreshToken = (payload: UserPayload): string => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
};

/**
 * Функція для перевірки дійсності токена доступу.
 *
 * @param token - Рядок, що містить JWT токен доступу для перевірки
 * @returns Об'єкт типу UserPayload з розшифрованими даними користувача
 *
 * У випадку недійсності токена (підробка, закінчення терміну дії тощо)
 * функція викине помилку, яку потрібно обробити.
 */
export const verifyAccessToken = (token: string): UserPayload => {
  return jwt.verify(token, ACCESS_SECRET) as UserPayload;
};

/**
 * Функція для перевірки дійсності токена оновлення.
 *
 * @param token - Рядок, що містить JWT токен оновлення для перевірки
 * @returns Об'єкт типу UserPayload з розшифрованими даними користувача
 *
 * У випадку недійсності токена (підробка, закінчення терміну дії тощо)
 * функція викине помилку, яку потрібно обробити.
 */
export const verifyRefreshToken = (token: string): UserPayload => {
  return jwt.verify(token, REFRESH_SECRET) as UserPayload;
};
