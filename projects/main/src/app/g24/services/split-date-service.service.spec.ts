import { TestBed } from '@angular/core/testing';

import { SplitDateServiceService } from './split-date-service.service';

describe('SplitDateServiceService', () => {
  let service: SplitDateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SplitDateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
