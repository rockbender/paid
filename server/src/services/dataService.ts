import { Invoice } from "../domain/models/invoice";

export class dataService {
  constructor() {}

  public findAll(): Invoice[] {
    const invoice: Invoice = {
      createdDate: new Date(),
      id: 1,
      timesheetId: 1,
    };
    return [invoice];
  }
}
