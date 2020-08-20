import { TestBed } from '@angular/core/testing';

import { ProductSeriesService } from './product-series.service';

describe('ProductSeriesColorService', () => {
  let service: ProductSeriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSeriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
