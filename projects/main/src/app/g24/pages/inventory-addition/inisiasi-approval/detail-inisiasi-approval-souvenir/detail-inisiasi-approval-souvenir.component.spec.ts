import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInisiasiApprovalSouvenirComponent } from './detail-inisiasi-approval-souvenir.component';

describe('DetailInisiasiApprovalSouvenirComponent', () => {
  let component: DetailInisiasiApprovalSouvenirComponent;
  let fixture: ComponentFixture<DetailInisiasiApprovalSouvenirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInisiasiApprovalSouvenirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInisiasiApprovalSouvenirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
