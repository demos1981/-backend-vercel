"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt");
const User_entity_1 = require("../models/User.entity");
const AppError_1 = require("../utils/AppError");
const authMiddleware = () => {
    return async (req, _res, next) => {
        var _a;
        try {
            const authHeader = req.header("Authorization");
            const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.Authorization) ||
                (authHeader && authHeader.startsWith("Bearer ")
                    ? authHeader.split(" ")[1]
                    : null);
            if (!token) {
                throw new AppError_1.AppError("Missing authentication token", 401);
            }
            const secret = process.env.ACCESS_TOKEN_SECRET;
            if (!secret) {
                throw new AppError_1.AppError("Access token secret is not defined", 500);
            }
            const { id } = (0, jwt_1.verifyAccessToken)(token);
            const user = await User_entity_1.User.findOne({ where: { id } });
            if (!user) {
                throw new AppError_1.AppError("User not found", 401);
            }
            req.user = user;
            next();
        }
        catch (err) {
            if (err instanceof AppError_1.AppError) {
                next(err);
            }
            else {
                next(new AppError_1.AppError("Invalid token", 401));
            }
        }
    };
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map