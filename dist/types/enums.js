"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.ItemSexEnum = exports.ItemStatusEnum = void 0;
var ItemStatusEnum;
(function (ItemStatusEnum) {
    ItemStatusEnum["NEW"] = "new";
    ItemStatusEnum["STOCK"] = "stock";
    ItemStatusEnum["OLD"] = "old";
})(ItemStatusEnum || (exports.ItemStatusEnum = ItemStatusEnum = {}));
var ItemSexEnum;
(function (ItemSexEnum) {
    ItemSexEnum["MAN"] = "man";
    ItemSexEnum["WOMAN"] = "woman";
    ItemSexEnum["CHILDREN"] = "children";
    ItemSexEnum["UNISEX"] = "unisex";
})(ItemSexEnum || (exports.ItemSexEnum = ItemSexEnum = {}));
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["OWNER"] = "OWNER";
    UserRole["CUSTOMER"] = "CUSTOMER";
})(UserRole || (exports.UserRole = UserRole = {}));
//# sourceMappingURL=enums.js.map