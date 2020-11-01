import { TestBed } from '@angular/core/testing';

import { InisiasiBahanBakuService } from './inisiasi-bahan-baku.service';

describe('InisiasiBahanBakuService', () => {
  let service: InisiasiBahanBakuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InisiasiBahanBakuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
