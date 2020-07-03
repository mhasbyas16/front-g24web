import { TestBed } from '@angular/core/testing';

import { PrmPpnService } from './prm-ppn.service';

describe('PrmPpnService', () => {
  let service: PrmPpnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrmPpnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
