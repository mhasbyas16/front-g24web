import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InisiasiApprovalComponent } from './inisiasi-approval.component';

describe('InisiasiApprovalComponent', () => {
  let component: InisiasiApprovalComponent;
  let fixture: ComponentFixture<InisiasiApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InisiasiApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InisiasiApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
