import { TestBed } from '@angular/core/testing';

import { CommonResourceService } from './common-resource.service';

describe('CommonResourceService', () => {
  let service: CommonResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
