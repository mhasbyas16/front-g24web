import { TestBed } from '@angular/core/testing';

import { RekeningKoranService } from './rekening-koran.service';

describe('RekeningKoranService', () => {
  let service: RekeningKoranService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RekeningKoranService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
