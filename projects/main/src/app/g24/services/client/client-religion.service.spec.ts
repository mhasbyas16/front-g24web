import { TestBed } from '@angular/core/testing';

import { ClientReligionService } from './client-religion.service';

describe('ClientReligionService', () => {
  let service: ClientReligionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientReligionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
