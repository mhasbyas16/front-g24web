import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterSovenirComponent } from './parameter-sovenir.component';

describe('ParameterSovenirComponent', () => {
  let component: ParameterSovenirComponent;
  let fixture: ComponentFixture<ParameterSovenirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterSovenirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterSovenirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
