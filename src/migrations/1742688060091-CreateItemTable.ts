import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateItemTable1742688060091 implements MigrationInterface {
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
            enum: ["new", "stock"],
            default: "'new'",
          },
          {
            name: "sex",
            type: "enum",
            enum: ["man", "woman", "children", "unisex"],
            default: "'unisex'",
          },
          {
            name: "category",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "photoUrl",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "videoUrl",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "documentUrl",
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
