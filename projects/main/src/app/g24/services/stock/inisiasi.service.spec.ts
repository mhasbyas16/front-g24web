import { TestBed } from '@angular/core/testing';

import { InisiasiService } from './inisiasi.service';

describe('InisiasiService', () => {
  let service: InisiasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InisiasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
