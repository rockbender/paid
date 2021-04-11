import { BaseEntity } from "./baseEntity";

export interface Project extends BaseEntity {
  name: string;
  description: string;
  isActive: boolean;
}
