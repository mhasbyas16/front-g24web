import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailItemInisiasiApprovalDinarComponent } from './detail-item-inisiasi-approval-dinar.component';

describe('DetailItemInisiasiApprovalDinarComponent', () => {
  let component: DetailItemInisiasiApprovalDinarComponent;
  let fixture: ComponentFixture<DetailItemInisiasiApprovalDinarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailItemInisiasiApprovalDinarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailItemInisiasiApprovalDinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
