import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailItemInisiasiApprovalGiftComponent } from './detail-item-inisiasi-approval-gift.component';

describe('DetailItemInisiasiApprovalGiftComponent', () => {
  let component: DetailItemInisiasiApprovalGiftComponent;
  let fixture: ComponentFixture<DetailItemInisiasiApprovalGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailItemInisiasiApprovalGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailItemInisiasiApprovalGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
