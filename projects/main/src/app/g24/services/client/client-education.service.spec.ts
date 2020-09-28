import { TestBed } from '@angular/core/testing';

import { ClientEducationService } from './client-education.service';

describe('ClientEducationService', () => {
  let service: ClientEducationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientEducationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
