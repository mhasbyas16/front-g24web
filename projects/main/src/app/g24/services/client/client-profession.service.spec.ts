import { TestBed } from '@angular/core/testing';

import { ClientProfessionService } from './client-profession.service';

describe('ClientProfessionService', () => {
  let service: ClientProfessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientProfessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
