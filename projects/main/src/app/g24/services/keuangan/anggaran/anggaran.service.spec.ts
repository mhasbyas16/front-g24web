import { TestBed } from '@angular/core/testing';

import { AnggaranService } from './anggaran.service';

describe('AnggaranService', () => {
  let service: AnggaranService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnggaranService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
