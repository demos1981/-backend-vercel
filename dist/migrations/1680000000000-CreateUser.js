"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser1680000000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateUser1680000000000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "serial",
                    isPrimary: true,
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "128",
                    isNullable: false,
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "128",
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: "password",
                    type: "varchar",
                    length: "128",
                    isNullable: false,
                },
                {
                    name: "role",
                    type: "varchar",
                    length: "128",
                    isNullable: false,
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "deletedAt",
                    type: "timestamp",
                    isNullable: true,
                },
            ],
        }), true);
        await queryRunner.createTable(new typeorm_1.Table({
            name: "user-item",
            columns: [
                {
                    name: "user_id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: "item_id",
                    type: "int",
                    isPrimary: true,
                },
            ],
        }), true);
        await queryRunner.createForeignKey("user-item", new typeorm_1.TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
        }));
        await queryRunner.createForeignKey("user-item", new typeorm_1.TableForeignKey({
            columnNames: ["item_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "item",
            onDelete: "CASCADE",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("user-item");
        await queryRunner.dropTable("users");
    }
}
exports.CreateUser1680000000000 = CreateUser1680000000000;
//# sourceMappingURL=1680000000000-CreateUser.js.map