import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalKonversiComponent } from './approval-konversi.component';

describe('ApprovalKonversiComponent', () => {
  let component: ApprovalKonversiComponent;
  let fixture: ComponentFixture<ApprovalKonversiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalKonversiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalKonversiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
