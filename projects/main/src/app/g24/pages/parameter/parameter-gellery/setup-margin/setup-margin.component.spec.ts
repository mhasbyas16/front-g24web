import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupMarginComponent } from './setup-margin.component';

describe('SetupMarginComponent', () => {
  let component: SetupMarginComponent;
  let fixture: ComponentFixture<SetupMarginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupMarginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupMarginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
