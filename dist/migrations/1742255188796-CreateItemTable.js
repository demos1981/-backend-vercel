"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateItemTable1742255188796 = void 0;
class CreateItemTable1742255188796 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "item" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_item" PRIMARY KEY ("id")
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "item"`);
    }
}
exports.CreateItemTable1742255188796 = CreateItemTable1742255188796;
//# sourceMappingURL=1742255188796-CreateItemTable.js.map