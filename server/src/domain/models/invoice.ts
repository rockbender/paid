import { BaseEntity } from "./baseEntity";

export interface Invoice extends BaseEntity {
  timesheetId: number;
  invoiceDate: Date;
  dueDate: Date;
  isPaid: boolean;
}
