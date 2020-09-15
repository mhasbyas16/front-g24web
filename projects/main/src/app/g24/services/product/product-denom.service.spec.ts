import { TestBed } from '@angular/core/testing';

import { ProductDenomService } from './product-denom.service';

describe('ProductDenomService', () => {
  let service: ProductDenomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDenomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
