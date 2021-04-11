import { BaseEntity } from "./baseEntity";
import { TimeEntry } from "./timeEntry";

export interface Timesheet extends BaseEntity {
  projectId: number;
  timeEntries: TimeEntry[];
}
