import { BaseEntity } from "./baseEntity";
import { Entity, Column } from "typeorm";

@Entity()
export class Project extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  isActive: boolean;
}
