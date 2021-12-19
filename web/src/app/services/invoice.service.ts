import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Invoice, InvoiceModel } from '../models/Invoice';
import { environment as env } from 'src/environments/environment';
import { InvoiceListModel } from '../models/InvoiceListModel';
import { InvoiceDetailModel } from '../models/InvoiceDetailModel';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  lastId: number = 1003;
  invoices: Invoice[] = [];
  constructor(private http: HttpClient) {}

  getInvoices(): Observable<InvoiceListModel[]> {
    return this.http.get<InvoiceListModel[]>(`${env.apiUrl}/invoices`);
  }

  getInvoice(invoiceNumber: number): Observable<InvoiceDetailModel> {
    return this.http.get<InvoiceDetailModel>(
      `${env.apiUrl}/invoices/${invoiceNumber}`
    );
    // const result = this.invoices.filter(x => x.invoiceNumber == invoiceNumber);
    // return result.length == 1 ? result[0] : null;
  }

  addOrUpdateInvoice(invoice: InvoiceModel): Observable<InvoiceModel> {
    if (invoice.id > 0) {
      console.log('Update invoice', invoice);
      return this.http.put<InvoiceModel>(`${env.apiUrl}/invoices`, invoice);
    }

    return this.http.post<InvoiceModel>(`${env.apiUrl}/invoices`, invoice);
  }

  deleteInvoice(invoiceNumber: number): Observable<Object> {
    return this.http.delete(`${env.apiUrl}/invoices/${invoiceNumber}`);
  }
}
