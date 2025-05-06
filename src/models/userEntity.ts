import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Item } from "./itemEntity";
import { UserRole } from "../types/enums";

@Entity({ name: "user" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 128, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 128, unique: true, nullable: false })
  email!: string;

  @Column({ type: "varchar", length: 128, nullable: false, select: false })
  password!: string;

  @Column({ type: "varchar", length: 128, nullable: false })
  role!: UserRole;

  @ManyToMany(() => Item, { cascade: true })
  @JoinTable({
    name: "user-item",
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "item_id", referencedColumnName: "id" },
  })
  products: Item[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deletedAt: Date;
}
