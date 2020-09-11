import { TestBed } from '@angular/core/testing';

import { JurnalInisiasiService } from './jurnal-inisiasi.service';

describe('JurnalInisiasiService', () => {
  let service: JurnalInisiasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JurnalInisiasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
