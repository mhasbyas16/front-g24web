import { TestBed } from '@angular/core/testing';

import { TransactionBuybackPriceService } from './transaction-buyback-price.service';

describe('TransactionBuybackPriceService', () => {
  let service: TransactionBuybackPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionBuybackPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
