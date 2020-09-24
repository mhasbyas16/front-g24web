import { TestBed } from '@angular/core/testing';

import { BudgetCostService } from './budget-cost.service';

describe('BudgetCostService', () => {
  let service: BudgetCostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetCostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
