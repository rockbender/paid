import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { InvoiceCreateComponent } from '../components/invoice-create/invoice-create.component';

@Injectable({
  providedIn: 'root'
})
export class InvoiceCreateGuard implements CanDeactivate<InvoiceCreateComponent> {
  canDeactivate(
    component: InvoiceCreateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean {
      if(component.invoiceForm.dirty) {
        return confirm("Are you sure you want to navigate away. All unsaved changes will be lost.");
      }
    return true;
  }
  
}
