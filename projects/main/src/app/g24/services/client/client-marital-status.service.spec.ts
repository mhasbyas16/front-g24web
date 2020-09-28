import { TestBed } from '@angular/core/testing';

import { ClientMaritalStatusService } from './client-marital-status.service';

describe('ClientMaritalStatusService', () => {
  let service: ClientMaritalStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientMaritalStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
