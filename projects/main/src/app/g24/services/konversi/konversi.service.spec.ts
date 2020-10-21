import { TestBed } from '@angular/core/testing';

import { KonversiService } from './konversi.service';

describe('KonversiService', () => {
  let service: KonversiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KonversiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
