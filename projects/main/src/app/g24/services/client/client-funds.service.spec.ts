import { TestBed } from '@angular/core/testing';

import { ClientFundsService } from './client-funds.service';

describe('ClientFundsService', () => {
  let service: ClientFundsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientFundsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
