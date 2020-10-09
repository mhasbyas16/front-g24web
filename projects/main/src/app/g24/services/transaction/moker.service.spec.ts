import { TestBed } from '@angular/core/testing';

import { MokerService } from './moker.service';

describe('MokerService', () => {
  let service: MokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MokerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
