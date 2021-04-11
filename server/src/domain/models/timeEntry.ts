import { BaseEntity } from "./baseEntity";

export interface TimeEntry extends BaseEntity {
  startDate: Date;
  endDate: Date;
  description: string;
}
