import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Invoice,
  InvoiceModel,
  WorkItem,
  WorkItemModel,
} from 'src/app/models/Invoice';
import { ProjectModel } from 'src/app/models/InvoiceDetailModel';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss'],
})
export class InvoiceCreateComponent implements OnInit {
  readonly rate: number = 80; // TODO Rishi - Get this from ProjectService;
  invoiceForm!: FormGroup;
  periodValidationMessage!: string;
  changesSaved: boolean = false;
  projects: ProjectModel[] = [];
  inEditMode: boolean = false;

  private validationMessages = {
    period: {
      required: 'Both dates are required',
      dateRange: 'Start Date cannot be after end date',
    },
  };

  get showInvoicePeriod() {
    return this.invoiceForm.get('hasInvoicePeriod')?.value;
  }
  get workItems(): FormArray {
    return <FormArray>this.invoiceForm.get('workItems');
  }
  get invoicePeriodC() {
    return this.invoiceForm.get('period');
  }
  get startDateC() {
    return this.invoiceForm.get('startDate');
  }
  get endDateC() {
    return this.invoiceForm.get('endDate');
  }

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private invoiceService: InvoiceService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    const invoiceNumber = Number(this.route.snapshot.paramMap.get('id'));

    this.inEditMode = invoiceNumber > 0;
    console.log('invoiceNumber', invoiceNumber);

    this.invoiceForm = this.fb.group({
      selectedProject: ['', Validators.required],
      dueDate: '',
      hasInvoicePeriod: false,
      period: this.fb.group({
        startDate: '',
        endDate: '',
      }),
      workItems: this.fb.array([
        this.buildWorkItem(),
        this.buildWorkItem(),
        this.buildWorkItem(),
        this.buildWorkItem(),
        this.buildWorkItem(),
        this.buildWorkItem(),
        this.buildWorkItem(),
        this.buildWorkItem(),
        this.buildWorkItem(),
        this.buildWorkItem(),
        this.buildWorkItem(),
        this.buildWorkItem(),
      ]) as FormArray,
    });

    this.projectService.getProjects().subscribe((r) => {
      this.projects = r;
    });

    if (this.inEditMode) {
      this.invoiceService.getInvoice(invoiceNumber).subscribe((r) => {
        console.log('invoice', r);
        const patchValue = {
          selectedProject: r.project.id,
          dueDate: r.dueDate.split('T')[0],
          period: {
            start: r.periodStartDate.split('T')[0],
            end: r.periodEndDate.split('T')[0],
          },
          workItems: r.workItems.map((x) => ({
            description: x.description,
            hours: x.durationMins === 0 ? '' : x.durationMins / 60,
          })),
        };
        this.invoiceForm.patchValue(patchValue);
      });
    }

    this.invoiceForm
      .get('hasInvoicePeriod')
      ?.valueChanges.subscribe((value) => this.onHasInvoicePeriod(value));

    this.invoicePeriodC?.valueChanges.subscribe((value) =>
      this.setValidationMessage(this.invoicePeriodC!)
    );
  }

  buildWorkItem(): FormGroup {
    return this.fb.group({
      description: '',
      hours: '',
    });
  }

  getWorkItemModels(): WorkItemModel[] {
    let workItems: WorkItemModel[] = [];
    this.workItems.controls.forEach((x) =>
      workItems.push({
        description: x.value.description,
        durationMins: x.value.hours * 60,
      } as WorkItemModel)
    );

    return workItems;
  }

  navigateToInvoices(): void {
    this.router.navigate(['invoices']);
  }

  onCreate() {
    if (this.invoiceForm.invalid) {
      return;
    }

    const values = this.invoiceForm.value;
    const invoiceToAdd: InvoiceModel = {
      projectId: values.selectedProject,
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: values.dueDate,
      isPaid: false,
      workItems: this.getWorkItemModels(),
      periodStartDate: values.period.startDate,
      periodEndDate: values.period.endDate,
    };

    console.log(invoiceToAdd);

    this.invoiceService.addInvoice(invoiceToAdd);
    this.changesSaved = true;
    this.navigateToInvoices();
  }

  onCancel(): void {
    this.navigateToInvoices();
  }

  onPreview(): void {}

  onHasInvoicePeriod(value: boolean): void {
    if (value) {
      this.invoicePeriodC?.addValidators(this.invoicePeriodValidator);
    } else {
      this.invoicePeriodC?.clearValidators();
    }

    this.invoicePeriodC?.updateValueAndValidity();
  }

  invoicePeriodValidator(
    c: AbstractControl
  ): { [key: string]: boolean } | null {
    const startDate = c.get('startDate');
    const endDate = c.get('endDate');

    if (startDate?.value === '' || endDate?.value === '') {
      return { required: true };
    }

    if (new Date(startDate?.value) > new Date(endDate?.value)) {
      return { dateRange: true };
    }

    return null;
  }

  //TODO Generalize it, currently it only serves Period control
  setValidationMessage(c: AbstractControl): void {
    this.periodValidationMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      if (c.errors['required']) {
        this.periodValidationMessage = this.validationMessages.period.required;
      } else if (c.errors['dateRange']) {
        this.periodValidationMessage = this.validationMessages.period.dateRange;
      }
    }
  }
}
