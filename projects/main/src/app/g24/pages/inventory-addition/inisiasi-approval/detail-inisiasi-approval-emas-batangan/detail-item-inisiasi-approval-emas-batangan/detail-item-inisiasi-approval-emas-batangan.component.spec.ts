import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailItemInisiasiApprovalEmasBatanganComponent } from './detail-item-inisiasi-approval-emas-batangan.component';

describe('DetailItemInisiasiApprovalEmasBatanganComponent', () => {
  let component: DetailItemInisiasiApprovalEmasBatanganComponent;
  let fixture: ComponentFixture<DetailItemInisiasiApprovalEmasBatanganComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailItemInisiasiApprovalEmasBatanganComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailItemInisiasiApprovalEmasBatanganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
