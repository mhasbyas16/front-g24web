import { TestBed } from '@angular/core/testing';

import { PrmJualService } from './prm-jual.service';

describe('PrmJualService', () => {
  let service: PrmJualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrmJualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
