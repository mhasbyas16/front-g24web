import { TestBed } from '@angular/core/testing';

import { ClientIncomeService } from './client-income.service';

describe('ClientIncomeService', () => {
  let service: ClientIncomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientIncomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
