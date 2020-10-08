import { TestBed } from '@angular/core/testing';

import { BuybackAcceptParameterService } from './buyback-accept-parameter.service';

describe('BuybackAcceptParameterService', () => {
  let service: BuybackAcceptParameterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuybackAcceptParameterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
