import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMediaFields1742849410844 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "item" 
            ADD COLUMN "photo_url" varchar(255),
            ADD COLUMN "video_url" varchar(255)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "item" 
            DROP COLUMN "photo_url",
            DROP COLUMN "video_url"
        `);
  }
}
