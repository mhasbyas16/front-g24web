import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInisiasiApprovalEmasBatanganComponent } from './detail-inisiasi-approval-emas-batangan.component';

describe('DetailInisiasiApprovalEmasBatanganComponent', () => {
  let component: DetailInisiasiApprovalEmasBatanganComponent;
  let fixture: ComponentFixture<DetailInisiasiApprovalEmasBatanganComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInisiasiApprovalEmasBatanganComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInisiasiApprovalEmasBatanganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
