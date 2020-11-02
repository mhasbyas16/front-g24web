import { TestBed } from '@angular/core/testing';

import { ParameterLookupService } from './parameter-lookup.service';

describe('ParameterLookupService', () => {
  let service: ParameterLookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParameterLookupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
