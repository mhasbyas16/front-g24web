import { TestBed } from '@angular/core/testing';

import { HargaTerbilangService } from './harga-terbilang.service';

describe('HargaTerbilangService', () => {
  let service: HargaTerbilangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HargaTerbilangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
