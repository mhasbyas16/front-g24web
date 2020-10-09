import { TestBed } from '@angular/core/testing';

import { TransactionBookingService } from './transaction-booking.service';

describe('TransactionBookingService', () => {
  let service: TransactionBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
