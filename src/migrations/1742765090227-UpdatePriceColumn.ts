import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePriceColumn1742765090227 implements MigrationInterface {
    name = 'UpdatePriceColumn1742765090227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "item" ADD "price" numeric(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "item" ADD "price" integer NOT NULL`);
    }

}
