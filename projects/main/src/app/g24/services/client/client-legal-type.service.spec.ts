import { TestBed } from '@angular/core/testing';

import { ClientLegalTypeService } from './client-legal-type.service';

describe('ClientLegalTypeService', () => {
  let service: ClientLegalTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientLegalTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
