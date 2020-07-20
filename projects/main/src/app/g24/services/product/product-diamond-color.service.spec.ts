import { TestBed } from '@angular/core/testing';

import { ProductDiamondColorService } from './product-diamond-color.service';

describe('ProductDiamondColorService', () => {
  let service: ProductDiamondColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDiamondColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
