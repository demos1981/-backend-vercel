"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateItemTable1742686498422 = void 0;
const typeorm_1 = require("typeorm");
class UpdateItemTable1742686498422 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "item",
            columns: [
                {
                    name: "id",
                    type: "serial",
                    isPrimary: true,
                },
                {
                    name: "articles",
                    type: "varchar",
                    length: "128",
                    isNullable: false,
                },
                {
                    name: "brand",
                    type: "varchar",
                    length: "128",
                    isNullable: false,
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "128",
                    isNullable: false,
                },
                {
                    name: "description",
                    type: "varchar",
                    length: "256",
                    isNullable: false,
                },
                {
                    name: "quantity",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "price",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "barcode",
                    type: "int",
                    isNullable: true,
                },
                {
                    name: "color",
                    type: "varchar",
                    length: "128",
                    isNullable: true,
                },
                {
                    name: "size",
                    type: "varchar",
                    length: "128",
                    isNullable: true,
                },
                {
                    name: "role",
                    type: "enum",
                    enum: ["NEW", "USED", "DAMAGED"],
                    default: "'NEW'",
                },
                {
                    name: "sex",
                    type: "enum",
                    enum: ["MALE", "FEMALE", "UNISEX"],
                    default: "'UNISEX'",
                },
                {
                    name: "category",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable("item");
    }
}
exports.UpdateItemTable1742686498422 = UpdateItemTable1742686498422;
//# sourceMappingURL=1742686498422-UpdateItemTable.js.map