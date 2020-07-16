import { TestBed } from '@angular/core/testing';

import { ClientNationalityService } from './client-nationality.service';

describe('ClientNationalityService', () => {
  let service: ClientNationalityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientNationalityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
