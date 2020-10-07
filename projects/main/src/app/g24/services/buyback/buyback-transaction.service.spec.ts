import { TestBed } from '@angular/core/testing';

import { BuybackTransactionService } from './buyback-transaction.service';

describe('BuybackTransactionService', () => {
  let service: BuybackTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuybackTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
