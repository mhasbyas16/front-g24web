import { TestBed } from '@angular/core/testing';

import { TransactionFlagBuybackService } from './transaction-flag-buyback.service';

describe('TransactionFlagBuybackService', () => {
  let service: TransactionFlagBuybackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionFlagBuybackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
