import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UpdateItemTable1742686498422 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("item");
  }
}
