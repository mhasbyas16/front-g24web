import { TestBed } from '@angular/core/testing';

import { ProductJenisService } from './product-jenis.service';

describe('ProductJenisService', () => {
  let service: ProductJenisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductJenisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
