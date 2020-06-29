import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLayoutAlertHeaderComponent } from './app-layout-alert-header.component';

describe('AppLayoutAlertHeaderComponent', () => {
  let component: AppLayoutAlertHeaderComponent;
  let fixture: ComponentFixture<AppLayoutAlertHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLayoutAlertHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLayoutAlertHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
