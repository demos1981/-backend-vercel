import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { IItem, ItemStatusEnum, ItemSexEnum } from "../types/item.types";

@Entity()
export class Item implements IItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 128, nullable: false })
  articles!: string;

  @Column({ type: "varchar", length: 128, nullable: false })
  brand!: string;

  @Column({ type: "varchar", length: 128, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 256, nullable: false })
  description!: string;

  @Column({ nullable: false })
  quantity!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  price!: number;

  @Column({ nullable: true })
  barcode: string;

  @Column({ type: "varchar", length: 128, nullable: true })
  color: string;

  @Column({ type: "varchar", length: 128, nullable: true })
  size: string;

  @Column({
    type: "enum",
    enum: ItemStatusEnum,
    default: ItemStatusEnum.NEW,
  })
  role: ItemStatusEnum;

  @Column({
    type: "enum",
    enum: ItemSexEnum,
    default: ItemSexEnum.UNISEX,
  })
  sex: ItemSexEnum;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column({ nullable: true })
  videoUrl: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
