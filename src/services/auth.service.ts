import bcrypt from "bcrypt";
import { User } from "../models/userEntity";
import { RegisterUserDto } from "../dto/auth.dto";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { removeRefreshToken } from "../utils/tokenManagemnet";
import { AppError } from "../utils/AppError";
import { UserRole } from "../types/enums";
/**
 * Функція для реєстрації нового користувача.
 *
 * @param registerUserData - Об'єкт, що містить дані для реєстрації (ім'я, email, пароль)
 * @returns Promise з об'єктом користувача, створеним у базі даних
 *
 * Функція хешує пароль користувача та зберігає нового користувача в базі даних.
 */
export const registerUser = async (
  registerUserData: RegisterUserDto
): Promise<User> => {
  const { name, email, password, role } = registerUserData;

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const roleUser = role || UserRole.CUSTOMER;

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = hashPassword;
    user.role = roleUser;

    const newUser = await user.save();

    return newUser;
  } catch (error: any) {
    // Логування для дебагу, можна прибрати в продакшн середовищі
    console.error("❌ Помилка при реєстрації користувача:", error);

    throw new AppError(
      error?.message || "Не вдалося зареєструвати користувача",
      500
    );
  }
};

/**
 * Функція для входу користувача в систему.
 *
 * @param email - Email користувача
 * @param password - Пароль користувача
 * @returns Promise з об'єктом, що містить дані користувача та токени, або null якщо автентифікація не вдалася
 *
 * Функція знаходить користувача за email, перевіряє пароль,
 * генерує токени доступу та оновлення у випадку успішної автентифікації.
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<{
  user: User;
  accessToken: string;
  refreshToken: string;
} | null> => {
  const user = await User.createQueryBuilder("user")
    .addSelect("user.password")
    .where("user.email = :email", { email })
    .getOne();
  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  const payload: { id: number; email: string } = {
    id: user.id,
    email: user.email,
  };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return { user, accessToken, refreshToken };
};

/**
 * Функція для виходу користувача з системи.
 *
 * @param userId - Ідентифікатор користувача
 *
 * Функція видаляє токен оновлення користувача зі сховища.
 */
export const logoutUser = async (userId: number) => {
  await removeRefreshToken(userId);
};
