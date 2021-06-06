import { TimeEntry } from "../domain/models/timeEntry";
import { Repository, getRepository } from "typeorm";

export class timeEntryService {
  private repository: Repository<TimeEntry>;

  constructor() {
    // this.repository = getRepository(TimeEntry);  // TODO: Rishi - Why is the repository not available in constructor?
  }

  public async findAll(): Promise<TimeEntry[]> {
    this.repository = getRepository(TimeEntry);
    return await this.repository.find();
  }

  public async add(entity: TimeEntry): Promise<boolean> {
    const result = await getRepository(TimeEntry).insert(entity);

    if (result.generatedMaps !== null) {
      return true;
    }

    return false;
  }
}
