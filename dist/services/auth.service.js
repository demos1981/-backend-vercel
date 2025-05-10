"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userEntity_1 = require("../models/userEntity");
const jwt_1 = require("../utils/jwt");
const tokenManagemnet_1 = require("../utils/tokenManagemnet");
const AppError_1 = require("../utils/AppError");
const enums_1 = require("../types/enums");
const registerUser = async (registerUserData) => {
    const { name, email, password, role } = registerUserData;
    try {
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const roleUser = role || enums_1.UserRole.CUSTOMER;
        const user = new userEntity_1.User();
        user.name = name;
        user.email = email;
        user.password = hashPassword;
        user.role = roleUser;
        const newUser = await user.save();
        return newUser;
    }
    catch (error) {
        console.error("❌ Помилка при реєстрації користувача:", error);
        throw new AppError_1.AppError((error === null || error === void 0 ? void 0 : error.message) || "Не вдалося зареєструвати користувача", 500);
    }
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await userEntity_1.User.createQueryBuilder("user")
        .addSelect("user.password")
        .where("user.email = :email", { email })
        .getOne();
    if (!user)
        return null;
    const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid)
        return null;
    const payload = {
        id: user.id,
        email: user.email,
    };
    const accessToken = (0, jwt_1.generateAccessToken)(payload);
    const refreshToken = (0, jwt_1.generateRefreshToken)(payload);
    return { user, accessToken, refreshToken };
};
exports.loginUser = loginUser;
const logoutUser = async (userId) => {
    await (0, tokenManagemnet_1.removeRefreshToken)(userId);
};
exports.logoutUser = logoutUser;
//# sourceMappingURL=auth.service.js.map