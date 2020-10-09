import { TestBed } from '@angular/core/testing';

import { BranchPegadaianService } from './branch-pegadaian.service';

describe('BranchPegadaianService', () => {
  let service: BranchPegadaianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchPegadaianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
