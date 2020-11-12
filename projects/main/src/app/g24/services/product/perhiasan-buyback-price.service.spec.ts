import { TestBed } from '@angular/core/testing';

import { PerhiasanBuybackPriceService } from './perhiasan-buyback-price.service';

describe('PerhiasanBuybackPriceService', () => {
  let service: PerhiasanBuybackPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerhiasanBuybackPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
