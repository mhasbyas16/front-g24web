import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInisiasiApprovalPerhiasanComponent } from './detail-inisiasi-approval-perhiasan.component';

describe('DetailInisiasiApprovalPerhiasanComponent', () => {
  let component: DetailInisiasiApprovalPerhiasanComponent;
  let fixture: ComponentFixture<DetailInisiasiApprovalPerhiasanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInisiasiApprovalPerhiasanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInisiasiApprovalPerhiasanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
