import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ItemStatusEnum, ItemSexEnum } from "../types/enums";

@Entity("item")
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  articles: string;

  @Column()
  brand: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column("numeric", { precision: 10, scale: 2 })
  price: number;

  @Column()
  barcode: string;

  @Column()
  color: string;

  @Column()
  size: string;

  @Column({
    type: "enum",
    enum: ItemStatusEnum,
    default: ItemStatusEnum.NEW,
  })
  status: ItemStatusEnum;

  @Column({
    type: "enum",
    enum: ItemSexEnum,
    default: ItemSexEnum.UNISEX,
  })
  sex: ItemSexEnum;

  @Column()
  category: string;

  @Column({ nullable: true })
  photoUrl?: string;

  @Column({ nullable: true })
  videoUrl?: string;

  @Column({ nullable: true })
  documentUrl?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
