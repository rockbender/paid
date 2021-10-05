import { TestBed } from '@angular/core/testing';

import { InvoiceCreateGuard } from './invoice-create.guard';

describe('InvoiceCreateGuard', () => {
  let guard: InvoiceCreateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InvoiceCreateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
