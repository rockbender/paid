import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../models/Invoice';
import { environment as env} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  lastId: number = 1003;
  invoices: Invoice[] = [];
  constructor(private http: HttpClient) {
    // this.invoices.push({
    //   invoiceNumber: 1001,
    //   creationDate: 'Aug 15, 2021',
    //   dueDate: 'Aug 31, 2021',
    //   projectId: 100,
    //   projectName: 'Forestry Inc.',
    //   isPaid: true,
    //   amount: 4500,
    //   workItems: [{
    //     description: 'Update homepage',
    //     hours: 2,
    //   }]
    // }, {
    //   invoiceNumber: 1002,
    //   creationDate: 'Sep 1, 2021',
    //   dueDate: 'Sep 15, 2021',
    //   projectId: 100,
    //   projectName: 'Forestry Inc.',
    //   isPaid: true,
    //   amount: 6300,
    //   workItems: [{
    //     description: 'Add logo',
    //     hours: 1,
    //   }]
    // }, {
    //   invoiceNumber: 1003,
    //   creationDate: 'Sep 15, 2021',
    //   dueDate: 'Sep 31, 2021',
    //   projectId: 100,
    //   projectName: 'Ocean Inc.',
    //   isPaid: false,
    //   amount: 3500,
    //   workItems: [{
    //     description: 'Update homepage',
    //     hours: 2,
    //   },
    //   {
    //     description: 'Resize logo',
    //     hours: 1,
    //   },
    //   {
    //     description: 'Upload images',
    //     hours: 5,
    //   }]
    // });
  }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>( `${env.apiUrl}/invoices`);
  }

  getInvoice(invoiceNumber: number): Invoice | null {
    const result = this.invoices.filter(x => x.invoiceNumber == invoiceNumber);
    return result.length == 1 ? result[0] : null;
  }

  addInvoice(invoice: Invoice): void {
    invoice.invoiceNumber = (++this.lastId);
    this.invoices.push(invoice);
  }
}
