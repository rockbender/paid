import { Component, OnInit } from '@angular/core';
import { InvoiceListModel } from 'src/app/models/InvoiceListModel';
import { InvoiceService } from 'src/app/services/invoice.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent implements OnInit {
  invoices: InvoiceListModel[] = [];
  isLoading = true;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoiceService
      .getInvoices()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((result) => (this.invoices = result));
  }
}
