import { TestBed } from '@angular/core/testing';

import { CoreResourceService } from './core-resource.service';

describe('CoreResourceService', () => {
  let service: CoreResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
