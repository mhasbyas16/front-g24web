import { TestBed } from '@angular/core/testing';

import { JurnalMutasiService } from './jurnal-mutasi.service';

describe('JurnalMutasiService', () => {
  let service: JurnalMutasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JurnalMutasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
