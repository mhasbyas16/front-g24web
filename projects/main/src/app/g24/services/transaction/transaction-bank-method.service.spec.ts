import { TestBed } from '@angular/core/testing';

import { TransactionBankMethodService } from './transaction-bank-method.service';

describe('TransactionBankMethodService', () => {
  let service: TransactionBankMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionBankMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
