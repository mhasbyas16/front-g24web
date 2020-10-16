import { TestBed } from '@angular/core/testing';

import { BuybackParameterService } from './buyback-parameter.service';

describe('BuybackParameterService', () => {
  let service: BuybackParameterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuybackParameterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
