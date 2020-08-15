import { TestBed } from '@angular/core/testing';

import { ProductPurityService } from './product-purity.service';

describe('ProductPurityService', () => {
  let service: ProductPurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductPurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
