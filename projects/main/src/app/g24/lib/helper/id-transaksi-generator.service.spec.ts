import { TestBed } from '@angular/core/testing';

import { IdTransaksiGeneratorService } from './id-transaksi-generator.service';

describe('IdTransaksiGeneratorService', () => {
  let service: IdTransaksiGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdTransaksiGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
