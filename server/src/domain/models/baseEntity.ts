import { Column, PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdDate: Date;
}
