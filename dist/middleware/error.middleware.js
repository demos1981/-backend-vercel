"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("../utils/AppError");
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof AppError_1.AppError) {
        res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }
    else {
        console.error("Unexpected Error:", err);
        res.status(500).json({
            status: "error",
            message: "Something went wrong. Please try again later.",
        });
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map