import { TestBed } from '@angular/core/testing';

import { PrmGlobalService } from './prm-global.service';

describe('PrmGlobalService', () => {
  let service: PrmGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrmGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
