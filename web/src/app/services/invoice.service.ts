import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  addInvoice(invoice: InvoiceModel): void {
    this.http
      .post<InvoiceModel>(`${env.apiUrl}/invoices`, invoice)
      .subscribe((r) => console.log('invoice submitted'));
  }

  deleteInvoice(invoiceNumber: number): void {
    this.http.delete(`${env.apiUrl}/invoices/${invoiceNumber}`).subscribe();
  }
}
