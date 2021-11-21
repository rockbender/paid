import { Component, OnInit } from '@angular/core';
import { InvoiceListModel } from 'src/app/models/InvoiceListModel';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent implements OnInit {
  invoices: InvoiceListModel[] = [];

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoiceService
      .getInvoices()
      .subscribe((result) => (this.invoices = result));
  }
}
