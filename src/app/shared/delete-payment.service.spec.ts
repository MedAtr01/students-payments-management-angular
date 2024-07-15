import { TestBed } from '@angular/core/testing';

import { DeletePaymentService } from './delete-payment.service';

describe('DeletePaymentService', () => {
  let service: DeletePaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletePaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
