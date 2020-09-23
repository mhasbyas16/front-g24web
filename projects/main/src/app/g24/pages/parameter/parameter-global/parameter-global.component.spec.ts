import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterGlobalComponent } from './parameter-global.component';

describe('ParameterGlobalComponent', () => {
  let component: ParameterGlobalComponent;
  let fixture: ComponentFixture<ParameterGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
