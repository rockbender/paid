import { Invoice } from "../domain/models/invoice";
import { Repository, getRepository } from "typeorm";

export class invoicesService {
  private repository: Repository<Invoice>;

  constructor() {
    // this.repository = getRepository(Invoice);  // TODO: Rishi - Why is the repository not available in constructor?
  }

  public async findAll(): Promise<Invoice[]> {
    this.repository = getRepository(Invoice);
    return await this.repository.find();
  }
}
