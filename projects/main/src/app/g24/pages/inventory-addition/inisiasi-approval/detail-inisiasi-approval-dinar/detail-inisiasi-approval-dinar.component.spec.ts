import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInisiasiApprovalDinarComponent } from './detail-inisiasi-approval-dinar.component';

describe('DetailInisiasiApprovalDinarComponent', () => {
  let component: DetailInisiasiApprovalDinarComponent;
  let fixture: ComponentFixture<DetailInisiasiApprovalDinarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInisiasiApprovalDinarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInisiasiApprovalDinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
