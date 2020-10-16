import { TestBed } from '@angular/core/testing';

import { CabangIndukService } from './cabang-induk.service';

describe('CabangIndukService', () => {
  let service: CabangIndukService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CabangIndukService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
