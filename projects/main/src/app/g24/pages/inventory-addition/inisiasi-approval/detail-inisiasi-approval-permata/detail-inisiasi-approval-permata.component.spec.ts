import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInisiasiApprovalPermataComponent } from './detail-inisiasi-approval-permata.component';

describe('DetailInisiasiApprovalPermataComponent', () => {
  let component: DetailInisiasiApprovalPermataComponent;
  let fixture: ComponentFixture<DetailInisiasiApprovalPermataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInisiasiApprovalPermataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInisiasiApprovalPermataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
