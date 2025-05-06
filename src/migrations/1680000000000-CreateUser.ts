import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateUser1680000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Таблиця users
    await queryRunner.createTable(
      new Table({
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
      }),
      true
    );

    // Таблиця зв'язку users <-> items
    await queryRunner.createTable(
      new Table({
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
      }),
      true
    );

    // Зовнішні ключі для user-item
    await queryRunner.createForeignKey(
      "user-item",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "user-item",
      new TableForeignKey({
        columnNames: ["item_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "item", // або "items" — залежить від назви твоєї таблиці
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user-item");
    await queryRunner.dropTable("users");
  }
}
