import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLayoutSubHeaderComponent } from './app-layout-sub-header.component';

describe('AppLayoutSubHeaderComponent', () => {
  let component: AppLayoutSubHeaderComponent;
  let fixture: ComponentFixture<AppLayoutSubHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLayoutSubHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLayoutSubHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
