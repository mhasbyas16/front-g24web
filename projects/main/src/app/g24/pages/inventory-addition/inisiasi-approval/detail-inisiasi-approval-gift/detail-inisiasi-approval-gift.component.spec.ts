import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInisiasiApprovalGiftComponent } from './detail-inisiasi-approval-gift.component';

describe('DetailInisiasiApprovalGiftComponent', () => {
  let component: DetailInisiasiApprovalGiftComponent;
  let fixture: ComponentFixture<DetailInisiasiApprovalGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInisiasiApprovalGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInisiasiApprovalGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
