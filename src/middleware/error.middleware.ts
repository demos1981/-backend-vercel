import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    // Handle known operational errors
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  } else {
    // Handle unknown errors
    console.error("Unexpected Error:", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong. Please try again later.",
    });
  }
};
