"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateItemTable1710716400000 = void 0;
const typeorm_1 = require("typeorm");
class CreateItemTable1710716400000 {
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
                    name: "name",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "description",
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
exports.CreateItemTable1710716400000 = CreateItemTable1710716400000;
//# sourceMappingURL=1710716400000-CreateItemTable.js.map