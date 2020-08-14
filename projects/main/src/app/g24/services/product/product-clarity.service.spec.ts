import { TestBed } from '@angular/core/testing';

import { ProductClarityService } from './product-clarity.service';

describe('ProductClarityService', () => {
  let service: ProductClarityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductClarityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
