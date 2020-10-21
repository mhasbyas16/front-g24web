import { TestBed } from '@angular/core/testing';

import { PrmLookupService } from './prm-lookup.service';

describe('PrmLookupService', () => {
  let service: PrmLookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrmLookupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
