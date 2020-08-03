import { TestBed } from '@angular/core/testing';

import { ClientBusinessFieldService } from './client-business-field.service';

describe('ClientBusinessFieldService', () => {
  let service: ClientBusinessFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientBusinessFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
