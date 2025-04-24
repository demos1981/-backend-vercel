import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import * as authService from "../services/auth.service";
import { ErrorMessage } from "../utils/messageError";
import {
  retrieveRefreshToken,
  storeRefreshToken,
} from "../utils/tokenManagemnet";
import { RegisterUserDto } from "../dto/auth.dto";
import { AppError } from "../utils/AppError";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { UserPayload } from "src/types/user.types";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registerUserDto: RegisterUserDto = req.body;

    // Validate required fields
    if (!registerUserDto.email || !registerUserDto.password) {
      throw new AppError("Email and password are required", 400);
    }

    const newUser = await authService.registerUser(registerUserDto);
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    next(error); // Pass error to centralized error handler
  }
};

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

    const storedToken = await retrieveRefreshToken(token);
    if (!storedToken) {
      throw new AppError("Invalid refresh token", 403);
    }

    const decoded = verify(
      token,
      process.env.REFRESH_TOKEN_SECRET!
    ) as JwtPayload;
    const newAccessToken = generateAccessToken({
      id: decoded.id,
      email: decoded.email,
    });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;

    // Validate token
    if (!token) {
      throw new AppError("Token is required", 400);
    }

    await authService.logoutUser(token);
    res.json({ message: "User logged out successfully" });
  } catch (error) {
    next(error); // Pass error to centralized error handler
  }
};
