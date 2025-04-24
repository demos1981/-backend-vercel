import bcrypt from "bcrypt";
import { User } from "../models/user.entity";
import { RegisterUserDto } from "../dto/auth.dto";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { removeRefreshToken } from "../utils/tokenManagemnet";

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

export const logoutUser = async (userId: number) => {
  await removeRefreshToken(userId);
};
