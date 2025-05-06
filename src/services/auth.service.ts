/**
 * Імпортує бібліотеку bcrypt для хешування паролів.
 * Bcrypt використовується для безпечного зберігання паролів у базі даних.
 */
import bcrypt from "bcrypt";

/**
 * Імпортує модель User, яка представляє користувача в базі даних.
 */
import { User } from "../models/userEntity";

/**
 * Імпортує тип даних для реєстрації користувача.
 * DTO (Data Transfer Object) визначає структуру даних, що надходять від клієнта.
 */
import { RegisterUserDto } from "../dto/auth.dto";

/**
 * Імпортує функції для генерації токенів доступу та оновлення.
 */
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

/**
 * Імпортує функцію для видалення токена оновлення зі сховища.
 */
import { removeRefreshToken } from "../utils/tokenManagemnet";

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
  const { name, email, password } = registerUserData;
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser: User = await User.save({
    name,
    email,
    password: hashPassword,
  });

  return newUser;
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

  const payload = { id: user.id, email: user.email };
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
