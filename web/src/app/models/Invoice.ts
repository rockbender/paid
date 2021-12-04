export interface Invoice {
  invoiceNumber: number;
  creationDate: string;
  amount: number;
  dueDate: string; // TODO - Make it Datetime
  projectId: number;
  projectName: string;
  isPaid: boolean;
  workItems: WorkItem[];
}

export interface WorkItem {
  description: string;
  hours: number;
}

export interface InvoiceModel {
  projectId: number;
  invoiceDate: string;
  dueDate: string;
  isPaid: boolean;
  periodStartDate: string;
  periodEndDate: string;
  workItems: WorkItemModel[];
}

export interface WorkItemModel {
  description: string;
  durationMins: number;
}
