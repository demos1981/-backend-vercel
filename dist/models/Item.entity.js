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
const item_types_1 = require("../types/item.types");
const item_types_2 = require("../types/item.types");
let Item = class Item {
};
exports.Item = Item;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Item.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: false }),
    __metadata("design:type", String)
], Item.prototype, "articles", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: false }),
    __metadata("design:type", String)
], Item.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: false }),
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256, nullable: false }),
    __metadata("design:type", String)
], Item.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Item.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Item.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Item.prototype, "barcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 128, nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: item_types_1.ItemStatusEnum,
        default: item_types_1.ItemStatusEnum.NEW,
    }),
    __metadata("design:type", String)
], Item.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: item_types_2.ItemSexEnum,
        default: item_types_2.ItemSexEnum.UNISEX,
    }),
    __metadata("design:type", String)
], Item.prototype, "sex", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Item.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Item.prototype, "updated_at", void 0);
exports.Item = Item = __decorate([
    (0, typeorm_1.Entity)()
], Item);
//# sourceMappingURL=Item.entity.js.map