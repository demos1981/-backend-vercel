import { Request, Response, NextFunction } from "express";
import { verifyRefreshToken } from "../utils/jwt";
import * as authService from "../services/auth.service";
import { ErrorMessage } from "../utils/messageError";
import { getRefreshToken, storeRefreshToken } from "../utils/tokenManagemnet";
import { RegisterUserDto } from "../dto/auth.dto";
import { AppError } from "../utils/AppError";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { UserPayload } from "src/types/user.types";

/**
 * Функція-контролер для реєстрації нового користувача.
 *
 * @param req - Об'єкт запиту Express, містить дані від клієнта
 * @param res - Об'єкт відповіді Express, використовується для відправки відповіді клієнту
 * @param next - Функція для передачі управління наступному middleware
 *
 * Приймає дані користувача з тіла запиту, перевіряє обов'язкові поля,
 * створює нового користувача через сервіс та повертає результат.
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registerUserDto: RegisterUserDto = req.body;

    // Валідація обов'язкових полів
    if (!registerUserDto.email || !registerUserDto.password) {
      throw new AppError("Email and password are required", 400);
    }

    const newUser = await authService.registerUser(registerUserDto);
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    next(error); // Передає помилку до централізованого обробника помилок
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Отримуємо параметри пагінації з query-параметрів
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, parseInt(req.query.limit as string) || 10); // обмеження на максимум

    const { users, total } = await authService.getAllUsers(page, limit);

    res.json({
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }); // Повертає масив користувачів
  } catch (error) {
    next(error);
  }
};

/**
 * Функція-контролер для входу користувача в систему.
 *
 * @param req - Об'єкт запиту Express, містить дані від клієнта
 * @param res - Об'єкт відповіді Express, використовується для відправки відповіді клієнту
 * @param next - Функція для передачі управління наступному middleware
 *
 * Приймає email та пароль користувача, перевіряє їх наявність,
 * аутентифікує користувача через сервіс, генерує токени доступу та оновлення,
 * зберігає токен оновлення та повертає обидва токени клієнту.
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    const user = await authService.loginUser(email, password);
    if (!user) {
      throw new AppError(ErrorMessage.errorInvalidPassword, 400);
    }

    const payload: UserPayload = { id: user.user.id, email: user.user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await storeRefreshToken(user.user.id, refreshToken);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

/**
 * Функція-контролер для оновлення токена доступу.
 *
 * @param req - Об'єкт запиту Express, містить дані від клієнта
 * @param res - Об'єкт відповіді Express, використовується для відправки відповіді клієнту
 * @param next - Функція для передачі управління наступному middleware
 *
 * Отримує токен оновлення з тіла запиту, перевіряє його наявність та валідність,
 * генерує новий токен доступу та повертає його клієнту.
 */
export const token = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;

    if (!token) {
      throw new AppError("Token is required", 401);
    }

    const storedToken = await getRefreshToken(token);
    if (!storedToken) {
      throw new AppError("Invalid refresh token", 403);
    }

    const decoded = verifyRefreshToken(token);
    const newAccessToken = generateAccessToken({
      id: decoded.id,
      email: decoded.email,
    });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

/**
 * Функція для валідації токена оновлення.
 *
 * @param refreshToken - Рядок, що містить токен оновлення для перевірки
 * @returns Об'єкт з розшифрованими даними користувача, якщо токен дійсний
 *
 * Перевіряє токен оновлення на валідність та знаходить відповідний токен у сховищі.
 * Якщо токен недійсний або не знайдений, викидає помилку.
 */
export const validateRefreshToken = async (refreshToken: string) => {
  try {
    const decoded = verifyRefreshToken(refreshToken);

    const storedToken = await getRefreshToken(decoded.id);
    if (!storedToken || storedToken !== refreshToken) {
      throw new AppError("Invalid or expired refresh token", 403);
    }

    return decoded;
  } catch (error) {
    throw new AppError("Invalid or expired refresh token", 403);
  }
};

/**
 * Функція-контролер для виходу користувача з системи.
 *
 * @param req - Об'єкт запиту Express, містить дані від клієнта
 * @param res - Об'єкт відповіді Express, використовується для відправки відповіді клієнту
 * @param next - Функція для передачі управління наступному middleware
 *
 * Отримує токен з тіла запиту, перевіряє його наявність,
 * викликає сервіс для виходу користувача та повертає повідомлення про успішний вихід.
 */
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;

    // Валідація токена
    if (!token) {
      throw new AppError("Token is required", 400);
    }

    await authService.logoutUser(token);
    res.json({ message: "User logged out successfully" });
  } catch (error) {
    next(error); // Передає помилку до централізованого обробника помилок
  }
};
