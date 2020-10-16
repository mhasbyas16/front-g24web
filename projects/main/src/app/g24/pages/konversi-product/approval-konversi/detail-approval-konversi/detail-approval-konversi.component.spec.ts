import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailApprovalKonversiComponent } from './detail-approval-konversi.component';

describe('DetailApprovalKonversiComponent', () => {
  let component: DetailApprovalKonversiComponent;
  let fixture: ComponentFixture<DetailApprovalKonversiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailApprovalKonversiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailApprovalKonversiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
