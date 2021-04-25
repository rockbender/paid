import { BaseEntity } from "./baseEntity";
import { Column, Entity } from "typeorm";

@Entity("Invoice")
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
