import { TestBed } from '@angular/core/testing';

import { ProductGoldColorService } from './product-gold-color.service';

describe('ProductGoldColorService', () => {
  let service: ProductGoldColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductGoldColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
