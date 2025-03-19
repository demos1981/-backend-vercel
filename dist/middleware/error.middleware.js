"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, _req, res, _next) => {
    console.error("Error:", error);
    res.status(500).json({
        error: "Internal server error",
        message: error.message,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map