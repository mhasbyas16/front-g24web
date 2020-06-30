import { TestBed } from '@angular/core/testing';

import { PasswordRequirementService } from './password-requirement.service';

describe('PasswordRequirementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordRequirementService = TestBed.get(PasswordRequirementService);
    expect(service).toBeTruthy();
  });
});
