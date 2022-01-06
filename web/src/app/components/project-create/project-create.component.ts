import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectModel } from 'src/app/models/InvoiceDetailModel';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss'],
})
export class ProjectCreateComponent implements OnInit {
  projectForm!: FormGroup;
  inEditMode: boolean = false;

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: '',
      description: '',
      rate: '',
      isActive: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      province: '',
      postalCode: '',
      country: '',
    });
  }

  onCancel() {
    this.router.navigate(['projects']);
  }

  onCreateOrUpdate() {
    console.log('project model', this.projectForm.value);
  }
}
