import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAuditLogComponent } from './detail-audit-log.component';

describe('DetailAuditLogComponent', () => {
  let component: DetailAuditLogComponent;
  let fixture: ComponentFixture<DetailAuditLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAuditLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAuditLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
