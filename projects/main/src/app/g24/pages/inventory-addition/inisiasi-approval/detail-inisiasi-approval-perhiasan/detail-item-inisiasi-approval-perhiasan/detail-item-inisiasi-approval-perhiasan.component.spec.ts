import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailItemInisiasiApprovalPerhiasanComponent } from './detail-item-inisiasi-approval-perhiasan.component';

describe('DetailItemInisiasiApprovalPerhiasanComponent', () => {
  let component: DetailItemInisiasiApprovalPerhiasanComponent;
  let fixture: ComponentFixture<DetailItemInisiasiApprovalPerhiasanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailItemInisiasiApprovalPerhiasanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailItemInisiasiApprovalPerhiasanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
