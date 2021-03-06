import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { TimesheetListComponent } from './components/timesheet-list/timesheet-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RouterModule } from '@angular/router';
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';
import { InvoiceCreateComponent } from './components/invoice-create/invoice-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoiceCreateGuard } from './guards/invoice-create.guard';
import { HttpClientModule } from '@angular/common/http';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectCreateComponent } from './components/project-create/project-create.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InvoiceListComponent,
    TimesheetListComponent,
    FooterComponent,
    MenubarComponent,
    SettingsComponent,
    InvoiceDetailComponent,
    InvoiceCreateComponent,
    ProjectListComponent,
    ProjectCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: InvoiceListComponent },
      { path: 'invoices', component: InvoiceListComponent },
      { path: 'invoice/:id', component: InvoiceDetailComponent },
      {
        path: 'new-invoice',
        component: InvoiceCreateComponent,
        canDeactivate: [InvoiceCreateGuard],
      },
      { path: 'edit-invoice/:id', component: InvoiceCreateComponent },
      { path: 'timesheets', component: TimesheetListComponent },
      { path: 'projects', component: ProjectListComponent },
      { path: 'new-project', component: ProjectCreateComponent },
      { path: 'settings', component: SettingsComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
