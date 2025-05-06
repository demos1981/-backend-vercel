import { Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { User } from "../models/userEntity";
import { RequestWithUser } from "../types/auth.interface";
import { AppError } from "../utils/AppError";

const authMiddleware = () => {
  return async (req: RequestWithUser, _res: Response, next: NextFunction) => {
    try {
      // Extract token from cookies or Authorization header
      const authHeader = req.header("Authorization");
      const token =
        req.cookies?.Authorization ||
        (authHeader && authHeader.startsWith("Bearer ")
          ? authHeader.split(" ")[1]
          : null);

      if (!token) {
        throw new AppError("Missing authentication token", 401);
      }

      // Verify token
      const secret = process.env.ACCESS_TOKEN_SECRET;
      if (!secret) {
        throw new AppError("Access token secret is not defined", 500);
      }

      const { id } = verifyAccessToken(token);

      // Find user in the database
      const user = await User.findOne({ where: { id } });
      if (!user) {
        throw new AppError("User not found", 401);
      }

      // Attach user to the request object
      req.user = user;
      next();
    } catch (err) {
      if (err instanceof AppError) {
        next(err); // Pass AppError to centralized error handler
      } else {
        next(new AppError("Invalid token", 401)); // Handle unexpected errors
      }
    }
  };
};

export default authMiddleware;
