import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityLayoutComponent } from './security-layout.component';

describe('SecurityLayoutComponent', () => {
  let component: SecurityLayoutComponent;
  let fixture: ComponentFixture<SecurityLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
