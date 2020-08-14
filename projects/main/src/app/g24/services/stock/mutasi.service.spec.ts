import { TestBed } from '@angular/core/testing';

import { MutasiService } from './mutasi.service';

describe('MutasiService', () => {
  let service: MutasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MutasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
