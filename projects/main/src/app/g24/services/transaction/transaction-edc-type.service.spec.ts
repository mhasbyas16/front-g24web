import { TestBed } from '@angular/core/testing';

import { TransactionEdcTypeService } from './transaction-edc-type.service';

describe('TransactionEdcTypeService', () => {
  let service: TransactionEdcTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionEdcTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
