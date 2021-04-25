import { Timesheet } from "../domain/models/timesheet";
import { Repository, getRepository } from "typeorm";

export class timesheetService {
  private repository: Repository<Timesheet>;

  constructor() {
    // this.repository = getRepository(Timesheet);  // TODO: Rishi - Why is the repository not available in constructor?
  }

  public async findAll(): Promise<Timesheet[]> {
    this.repository = getRepository(Timesheet);
    return await this.repository.find();
  }
}
