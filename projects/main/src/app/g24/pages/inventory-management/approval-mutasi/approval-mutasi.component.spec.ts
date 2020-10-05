import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalMutasiComponent } from './approval-mutasi.component';

describe('ApprovalMutasiComponent', () => {
  let component: ApprovalMutasiComponent;
  let fixture: ComponentFixture<ApprovalMutasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalMutasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalMutasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
