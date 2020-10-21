import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InisiasiApprovalBahanBakuComponent } from './inisiasi-approval-bahan-baku.component';

describe('InisiasiApprovalBahanBakuComponent', () => {
  let component: InisiasiApprovalBahanBakuComponent;
  let fixture: ComponentFixture<InisiasiApprovalBahanBakuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InisiasiApprovalBahanBakuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InisiasiApprovalBahanBakuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
