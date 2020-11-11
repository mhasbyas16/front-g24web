import { TestBed } from '@angular/core/testing';

import { CheckNikService } from './check-nik.service';

describe('CheckNikService', () => {
  let service: CheckNikService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckNikService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
