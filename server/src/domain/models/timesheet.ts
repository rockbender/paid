import { BaseEntity } from "./baseEntity";
import { TimeEntry } from "./timeEntry";
import { Entity, Column } from "typeorm";

@Entity()
export class Timesheet extends BaseEntity {
  @Column()
  projectId: number;

  timeEntries: TimeEntry[];

  @Column()
  periodStartDate: Date;

  @Column()
  periodEndDate: Date;
}
