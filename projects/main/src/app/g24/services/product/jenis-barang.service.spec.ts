import { TestBed } from '@angular/core/testing';

import { JenisBarangService } from './jenis-barang.service';

describe('JenisBarangService', () => {
  let service: JenisBarangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JenisBarangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
