import { TestBed } from '@angular/core/testing';

import { ApprovalKonversiService } from './approval-konversi.service';

describe('ApprovalKonversiService', () => {
  let service: ApprovalKonversiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovalKonversiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
