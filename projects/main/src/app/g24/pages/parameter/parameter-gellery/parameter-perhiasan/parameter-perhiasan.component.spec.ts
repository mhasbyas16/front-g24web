import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterPerhiasanComponent } from './parameter-perhiasan.component';

describe('ParameterPerhiasanComponent', () => {
  let component: ParameterPerhiasanComponent;
  let fixture: ComponentFixture<ParameterPerhiasanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterPerhiasanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterPerhiasanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
