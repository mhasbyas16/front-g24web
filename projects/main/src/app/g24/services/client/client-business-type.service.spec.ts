import { TestBed } from '@angular/core/testing';

import { ClientBusinessTypeService } from './client-business-type.service';

describe('ClientBusinessTypeService', () => {
  let service: ClientBusinessTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientBusinessTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
