import { TestBed } from '@angular/core/testing';

import { CifGeneratorService } from './cif-generator.service';

describe('CifGeneratorService', () => {
  let service: CifGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CifGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
