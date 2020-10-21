import { TestBed } from '@angular/core/testing';

import { TokoPenyediaService } from './toko-penyedia.service';

describe('TokoPenyediaService', () => {
  let service: TokoPenyediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokoPenyediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
