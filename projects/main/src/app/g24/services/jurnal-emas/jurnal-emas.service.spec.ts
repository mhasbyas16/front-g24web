import { TestBed } from '@angular/core/testing';

import { JurnalEmasService } from './jurnal-emas.service';

describe('JurnalEmasService', () => {
  let service: JurnalEmasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JurnalEmasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
