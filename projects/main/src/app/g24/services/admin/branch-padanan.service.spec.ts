import { TestBed } from '@angular/core/testing';

import { BranchPadananService } from './branch-padanan.service';

describe('BranchPadananService', () => {
  let service: BranchPadananService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchPadananService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
