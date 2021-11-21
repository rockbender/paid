import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice, WorkItem } from 'src/app/models/Invoice';
import {
  InvoiceDetailModel,
  WorkItemModel,
} from 'src/app/models/InvoiceDetailModel';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
})
export class InvoiceDetailComponent implements OnInit {
  readonly TOTAL_ROWS: number = 7; // ToDO Rishi - get this from settings
  readonly RATE: number = 80; // TODO Rishi - Get this from projectService
  readonly GST_RATE: number = 5;

  invoice!: InvoiceDetailModel | null;
  totalHours: number = 0;

  get workItems(): WorkItemModel[] {
    let items = Array<WorkItemModel>(this.TOTAL_ROWS);

    this.invoice?.workItems.forEach((wi, i) => {
      this.totalHours += wi.durationMins;
      items[i] = wi;
    });

    return items;
  }

  get subTotal() {
    return this.RATE * this.totalHours;
  }
  get gst() {
    return (this.subTotal * this.GST_RATE) / 100;
  }
  get grandTotal() {
    return this.subTotal + this.gst;
  }
  get billingAddress() {
    const project = this.invoice?.project;
    return `${project?.name}
     ${project?.addressLine1}${
      project?.addressLine2 ? `\n${project.addressLine2}` : ''
    }
     ${project?.city} ${project?.postalCode}`;
  }

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    const invoiceNumber = Number(this.route.snapshot.paramMap.get('id'));
    this.invoiceService
      .getInvoice(invoiceNumber)
      .subscribe((r) => (this.invoice = r));
  }

  printPDF(): void {
    window.print();
  }
}
