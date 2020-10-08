import { TestBed } from '@angular/core/testing';

import { TransactionBankInstallmentService } from './transaction-bank-installment.service';

describe('TransactionBankInstallmentService', () => {
  let service: TransactionBankInstallmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionBankInstallmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
