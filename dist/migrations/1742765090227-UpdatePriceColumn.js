"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePriceColumn1742765090227 = void 0;
class UpdatePriceColumn1742765090227 {
    constructor() {
        this.name = 'UpdatePriceColumn1742765090227';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "item" ADD "price" numeric(10,2) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "item" ADD "price" integer NOT NULL`);
    }
}
exports.UpdatePriceColumn1742765090227 = UpdatePriceColumn1742765090227;
//# sourceMappingURL=1742765090227-UpdatePriceColumn.js.map