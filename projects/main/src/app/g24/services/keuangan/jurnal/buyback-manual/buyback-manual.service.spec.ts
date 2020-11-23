import { TestBed } from '@angular/core/testing';

import { BuybackManualService } from './buyback-manual.service';

describe('BuybackManualService', () => {
  let service: BuybackManualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuybackManualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
