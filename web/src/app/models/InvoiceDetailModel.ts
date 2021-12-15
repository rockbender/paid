export interface InvoiceDetailModel {
  invoiceId: number;
  invoiceDate: Date;
  dueDate: string;
  project: ProjectModel;
  periodStartDate: string;
  periodEndDate: string;
  workItems: WorkItemModel[];
}

export interface ProjectModel {
  id: number;
  name: string;
  description: string;
  rateCents: number;
  isActive: boolean;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface WorkItemModel {
  id: number;
  description: string;
  durationMins: number;
}
