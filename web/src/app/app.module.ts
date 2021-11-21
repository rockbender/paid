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
      { path: 'timesheets', component: TimesheetListComponent },
      { path: 'settings', component: SettingsComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
