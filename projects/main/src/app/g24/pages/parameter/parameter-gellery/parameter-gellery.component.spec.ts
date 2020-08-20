import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterGelleryComponent } from './parameter-gellery.component';

describe('ParameterGelleryComponent', () => {
  let component: ParameterGelleryComponent;
  let fixture: ComponentFixture<ParameterGelleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterGelleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterGelleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
