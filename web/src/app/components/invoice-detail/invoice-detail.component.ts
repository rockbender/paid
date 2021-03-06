import { preserveWhitespacesDefault } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice, WorkItem } from 'src/app/models/Invoice';
import {
  InvoiceDetailModel,
  WorkItemModel,
} from 'src/app/models/InvoiceDetailModel';
import { userSetting } from 'src/app/models/userSetting';
import { InvoiceService } from 'src/app/services/invoice.service';
import { UserSettingsService } from 'src/app/services/user-settings.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
})
export class InvoiceDetailComponent implements OnInit {
  readonly TOTAL_ROWS: number = 12; // ToDO Rishi - get this from settings
  readonly RATE: number = 80; // TODO Rishi - Get this from projectService
  readonly GST_RATE: number = 5;

  userSetting!: userSetting;
  invoiceNumber!: number;
  invoice!: InvoiceDetailModel | null;

  get workItems(): WorkItemModel[] {
    let items = Array<WorkItemModel>(this.TOTAL_ROWS);

    // TODO Rishi - use index based loop to assign values to each
    // item in the grid array which is initiall empty
    this.invoice?.workItems.forEach((wi, i) => {
      items[i] = wi;
    });

    return items;
  }

  get totalHours() {
    let total = 0.0;

    this.invoice?.workItems.forEach((wi) => {
      total += wi.durationMins / 60;
    });

    return total;
  }
  get subTotal() {
    return this.projectRate * this.totalHours;
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
  get projectRate() {
    const project = this.invoice?.project;
    return project?.rateCents == null ? this.RATE : project.rateCents / 100;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService,
    private userSettingService: UserSettingsService
  ) {}

  ngOnInit(): void {
    this.userSetting = this.userSettingService.getUserSettings();

    this.invoiceNumber = Number(this.route.snapshot.paramMap.get('id'));
    this.invoiceService
      .getInvoice(this.invoiceNumber)
      .subscribe((r) => (this.invoice = r));
  }

  printPDF(): void {
    window.print();
  }

  editInvoice(): void {
    this.router.navigate([`edit-invoice/${this.invoice?.invoiceId}`]);
  }

  deleteInvoice(): void {
    const hasConfirmed = window.confirm(
      'Are you sure you want to delete this invoice?'
    );

    if (hasConfirmed) {
      this.invoiceService
        .deleteInvoice(this.invoiceNumber)
        .subscribe((r) => this.router.navigate(['/']));
    }
  }
}
