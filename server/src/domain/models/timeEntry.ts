import { BaseEntity } from "./baseEntity";
import { Entity, Column } from "typeorm";

@Entity()
export class TimeEntry extends BaseEntity {
  @Column()
  timeSheetId: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  description: string;
}
