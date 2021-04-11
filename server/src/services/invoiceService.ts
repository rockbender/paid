import { Invoice } from "../domain/models/invoice";

export class invoiceService {
  constructor() {}

  private fakeInvoice: Invoice = {
    id: 1,
    timesheetId: 1,
    createdDate: new Date(),
    dueDate: new Date(2099, 1, 1),
    invoiceDate: new Date(),
    isPaid: false,
  };

  public findAll(): Invoice[] {
    return [this.fakeInvoice];
  }
}
