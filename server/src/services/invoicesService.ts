import { Invoice } from "../domain/models/invoice";
import { getConnection, Repository } from "typeorm";

export class invoicesService {
  private repository: Repository<Invoice>;

  constructor() {
    this.repository = getConnection().getRepository(Invoice);
  }

  private fakeInvoice: Invoice = {
    id: 1,
    timesheetId: 1,
    createdDate: new Date(),
    dueDate: new Date(2099, 1, 1),
    invoiceDate: new Date(),
    isPaid: false,
  };

  public async findAll(): Promise<Invoice[]> {
    const temp = await this.repository.find();
    return temp;
    // return [this.fakeInvoice];
  }
}
