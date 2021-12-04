import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProjectModel } from '../models/InvoiceDetailModel';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(`${env.apiUrl}/projects`);
  }
}
