import { TestBed } from '@angular/core/testing';

import { TransactionMethodService } from './transaction-method.service';

describe('TransactionMethodService', () => {
  let service: TransactionMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
