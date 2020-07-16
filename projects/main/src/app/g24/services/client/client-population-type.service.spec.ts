import { TestBed } from '@angular/core/testing';

import { ClientPopulationTypeService } from './client-population-type.service';

describe('ClientPopulationTypeService', () => {
  let service: ClientPopulationTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientPopulationTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
