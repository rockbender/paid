export interface InvoiceListModel {
  invoiceId: number;
  projectName: string;
  dueDate: Date;
  totalAmount: number;
  isPaid: boolean;
}