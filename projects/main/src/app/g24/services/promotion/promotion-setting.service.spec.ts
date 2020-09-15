import { TestBed } from '@angular/core/testing';

import { PromotionSettingService } from './promotion-setting.service';

describe('PromotionSettingService', () => {
  let service: PromotionSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromotionSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
