import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailItemInisiasiApprovalSouvenirComponent } from './detail-item-inisiasi-approval-souvenir.component';

describe('DetailItemInisiasiApprovalSouvenirComponent', () => {
  let component: DetailItemInisiasiApprovalSouvenirComponent;
  let fixture: ComponentFixture<DetailItemInisiasiApprovalSouvenirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailItemInisiasiApprovalSouvenirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailItemInisiasiApprovalSouvenirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
