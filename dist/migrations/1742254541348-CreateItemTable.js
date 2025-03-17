"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateItemTable1742254541348 = void 0;
class CreateItemTable1742254541348 {
    constructor() {
        this.name = 'CreateItemTable1742254541348';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "item" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "item"`);
    }
}
exports.CreateItemTable1742254541348 = CreateItemTable1742254541348;
//# sourceMappingURL=1742254541348-CreateItemTable.js.map