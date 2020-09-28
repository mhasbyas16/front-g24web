import { TestBed } from '@angular/core/testing';

import { TransactionFlagService } from './transaction-flag.service';

describe('TransactionFlagService', () => {
  let service: TransactionFlagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionFlagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
