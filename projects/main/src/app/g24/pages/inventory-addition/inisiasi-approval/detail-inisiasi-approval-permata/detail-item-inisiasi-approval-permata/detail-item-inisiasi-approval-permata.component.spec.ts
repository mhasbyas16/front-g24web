import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailItemInisiasiApprovalPermataComponent } from './detail-item-inisiasi-approval-permata.component';

describe('DetailItemInisiasiApprovalPermataComponent', () => {
  let component: DetailItemInisiasiApprovalPermataComponent;
  let fixture: ComponentFixture<DetailItemInisiasiApprovalPermataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailItemInisiasiApprovalPermataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailItemInisiasiApprovalPermataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
