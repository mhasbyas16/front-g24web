import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLayoutSidebarComponent } from './app-layout-sidebar.component';

describe('AppLayoutSidebarComponent', () => {
  let component: AppLayoutSidebarComponent;
  let fixture: ComponentFixture<AppLayoutSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLayoutSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLayoutSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
