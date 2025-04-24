"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRefreshToken = exports.retrieveRefreshToken = exports.storeRefreshToken = void 0;
const refreshTokens_entity_1 = require("../models/refreshTokens.entity");
const storeRefreshToken = async (userId, token) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);
    await refreshTokens_entity_1.RefreshToken.save({
        userId,
        token,
        expiryDate,
    });
};
exports.storeRefreshToken = storeRefreshToken;
const retrieveRefreshToken = async (token) => {
    const refreshToken = await refreshTokens_entity_1.RefreshToken.findOne({
        where: { token },
    });
    if (!refreshToken || refreshToken.expiryDate <= new Date())
        return null;
    return refreshToken.token;
};
exports.retrieveRefreshToken = retrieveRefreshToken;
const removeRefreshToken = async (token) => {
    await refreshTokens_entity_1.RefreshToken.delete({ token });
};
exports.removeRefreshToken = removeRefreshToken;
//# sourceMappingURL=tokenManagemnet.js.map