"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMediaFields1742849410844 = void 0;
class AddMediaFields1742849410844 {
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "item" 
            ADD COLUMN "photo_url" varchar(255),
            ADD COLUMN "video_url" varchar(255)
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "item" 
            DROP COLUMN "photo_url",
            DROP COLUMN "video_url"
        `);
    }
}
exports.AddMediaFields1742849410844 = AddMediaFields1742849410844;
//# sourceMappingURL=1742849410844-AddMediaFields.js.map