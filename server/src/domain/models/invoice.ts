import { BaseEntity } from "./baseEntity";
import { Column, Entity } from "typeorm";

@Entity()
export class Invoice extends BaseEntity {
  @Column()
  timesheetId: number;

  @Column()
  invoiceDate: Date;

  @Column()
  dueDate: Date;

  @Column()
  isPaid: boolean;
}
