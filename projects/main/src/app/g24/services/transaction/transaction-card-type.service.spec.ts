import { TestBed } from '@angular/core/testing';

import { TransactionCardTypeService } from './transaction-card-type.service';

describe('TransactionCardTypeService', () => {
  let service: TransactionCardTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionCardTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
