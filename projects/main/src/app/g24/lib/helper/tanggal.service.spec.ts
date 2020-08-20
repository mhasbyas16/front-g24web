import { TestBed } from '@angular/core/testing';

import { TanggalService } from './tanggal.service';

describe('TanggalService', () => {
  let service: TanggalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TanggalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
