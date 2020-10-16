import { TestBed } from '@angular/core/testing';

import { GenerateVoucherService } from './generate-voucher.service';

describe('GenerateVoucherService', () => {
  let service: GenerateVoucherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateVoucherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
