import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Invoice, WorkItem } from 'src/app/models/Invoice';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss']
})
export class InvoiceCreateComponent implements OnInit {
  invoiceForm!: FormGroup;
  rate: number = 80;  // TODO Rishi - Get this from ProjectService;

  get showInvoicePeriod() { return this.invoiceForm.get('hasInvoicePeriod')?.value; }
  get descriptions() {
    const arr =  this.invoiceForm.get('descriptions') as FormArray;
    return arr.controls as FormGroup[];
  }
  get startDateC() { return this.invoiceForm.get('startDate'); }
  get endDateC() { return this.invoiceForm.get('endDate'); }

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      selectedProject: 'IronWorks',
      dueDate: '',
      startDate: '',
      endDate: '',
      hasInvoicePeriod: false,
      descriptions: this.fb.array([
        this.buildDescription(),
        this.buildDescription(),
        this.buildDescription(),
      ]) as FormArray
    });
  }

  buildDescription(): FormGroup {
    return this.fb.group({
      desc: '', hours: ''
    });
  }

  getInvoiceTotal(): number {
    const workItems = this.invoiceForm.value['descriptions'];
    let total = 0;
    //TODO Rishi - Use reduce
    workItems.forEach((w: any) => {
      total += isNaN(w.hours) || w.hours === '' ? 0 : Number.parseInt(w.hours);
    });

    return total * this.rate;
  }

  getWorkItems(): WorkItem[] {
    let workItems: WorkItem[] = [];
    this.descriptions.forEach(x => workItems.push({
      description: x.value.desc,
      hours: x.value.hours,
    } as WorkItem))

    return workItems;
  }

  navigateToInvoices(): void {
    this.router.navigate(['invoices']);
  }

  onCreate() {
    const values = this.invoiceForm.value;
    const invoiceToAdd: Invoice = {
      amount: this.getInvoiceTotal(),
      creationDate: (new Date()).toISOString().split('T')[0],
      dueDate: values.dueDate,
      invoiceNumber: 0,
      isPaid: false,
      projectId: 1,
      projectName: values.selectedProject,
      workItems: this.getWorkItems()
    }

    this.invoiceService.addInvoice(invoiceToAdd);
    this.navigateToInvoices();
  }

  onCancel(): void {
    this.navigateToInvoices();
  }

  onPreview(): void {

  }

  onHasInvoicePeriod(value: boolean): void {
    console.log('onHasInvoicePeriod clicked', value);
    if(value) {
      this.startDateC?.addValidators(Validators.required);
      this.endDateC?.addValidators(Validators.required);
    } else {
      this.startDateC?.clearValidators();
      this.endDateC?.clearValidators();
    }

    this.endDateC?.updateValueAndValidity();
    this.endDateC?.updateValueAndValidity();
  }
}
