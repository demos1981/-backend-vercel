"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.validateRefreshToken = exports.token = exports.login = exports.getUsers = exports.register = void 0;
const jwt_1 = require("../utils/jwt");
const authService = __importStar(require("../services/auth.service"));
const messageError_1 = require("../utils/messageError");
const tokenManagemnet_1 = require("../utils/tokenManagemnet");
const AppError_1 = require("../utils/AppError");
const jwt_2 = require("../utils/jwt");
const register = async (req, res, next) => {
    try {
        const registerUserDto = req.body;
        if (!registerUserDto.email || !registerUserDto.password) {
            throw new AppError_1.AppError("Email and password are required", 400);
        }
        const newUser = await authService.registerUser(registerUserDto);
        res
            .status(201)
            .json({ message: "User registered successfully", user: newUser });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const getUsers = async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, parseInt(req.query.limit) || 10);
        const { users, total } = await authService.getAllUsers(page, limit);
        res.json({
            users,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUsers = getUsers;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new AppError_1.AppError("Email and password are required", 400);
        }
        const user = await authService.loginUser(email, password);
        if (!user) {
            throw new AppError_1.AppError(messageError_1.ErrorMessage.errorInvalidPassword, 400);
        }
        const payload = { id: user.user.id, email: user.user.email };
        const accessToken = (0, jwt_2.generateAccessToken)(payload);
        const refreshToken = (0, jwt_2.generateRefreshToken)(payload);
        await (0, tokenManagemnet_1.storeRefreshToken)(user.user.id, refreshToken);
        res.json({ accessToken, refreshToken });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const token = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) {
            throw new AppError_1.AppError("Token is required", 401);
        }
        const storedToken = await (0, tokenManagemnet_1.getRefreshToken)(token);
        if (!storedToken) {
            throw new AppError_1.AppError("Invalid refresh token", 403);
        }
        const decoded = (0, jwt_1.verifyRefreshToken)(token);
        const newAccessToken = (0, jwt_2.generateAccessToken)({
            id: decoded.id,
            email: decoded.email,
        });
        res.json({ accessToken: newAccessToken });
    }
    catch (error) {
        next(error);
    }
};
exports.token = token;
const validateRefreshToken = async (refreshToken) => {
    try {
        const decoded = (0, jwt_1.verifyRefreshToken)(refreshToken);
        const storedToken = await (0, tokenManagemnet_1.getRefreshToken)(decoded.id);
        if (!storedToken || storedToken !== refreshToken) {
            throw new AppError_1.AppError("Invalid or expired refresh token", 403);
        }
        return decoded;
    }
    catch (error) {
        throw new AppError_1.AppError("Invalid or expired refresh token", 403);
    }
};
exports.validateRefreshToken = validateRefreshToken;
const logout = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) {
            throw new AppError_1.AppError("Token is required", 400);
        }
        await authService.logoutUser(token);
        res.json({ message: "User logged out successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map