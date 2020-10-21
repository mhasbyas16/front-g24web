import { TestBed } from '@angular/core/testing';

import { PrmJournalService } from './prm-journal.service';

describe('PrmJournalService', () => {
  let service: PrmJournalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrmJournalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
