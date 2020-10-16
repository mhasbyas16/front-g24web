import { TestBed } from '@angular/core/testing';

import { ClientIdTypeService } from './client-id-type.service';

describe('ClientIdTypeService', () => {
  let service: ClientIdTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientIdTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
