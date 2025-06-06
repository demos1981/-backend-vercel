"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../types/enums");
let Item = class Item {
};
exports.Item = Item;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Item.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "articles", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Item.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Item.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "barcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: enums_1.ItemStatusEnum,
        default: enums_1.ItemStatusEnum.NEW,
    }),
    __metadata("design:type", String)
], Item.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: enums_1.ItemSexEnum,
        default: enums_1.ItemSexEnum.UNISEX,
    }),
    __metadata("design:type", String)
], Item.prototype, "sex", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Item.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "photoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "videoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "documentUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Item.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Item.prototype, "updated_at", void 0);
exports.Item = Item = __decorate([
    (0, typeorm_1.Entity)({ name: "item" })
], Item);
//# sourceMappingURL=itemEntity.js.map