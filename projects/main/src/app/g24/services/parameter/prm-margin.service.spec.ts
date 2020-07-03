import { TestBed } from '@angular/core/testing';

import { PrmMarginService } from './prm-margin.service';

describe('PrmMarginService', () => {
  let service: PrmMarginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrmMarginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
