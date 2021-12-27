import { Component, OnInit } from '@angular/core';
import { ProjectModel } from 'src/app/models/InvoiceDetailModel';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  projects: ProjectModel[] = [];
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((r) => (this.projects = r));
  }
}
