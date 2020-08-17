import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterBerlianComponent } from './parameter-berlian.component';

describe('ParameterBerlianComponent', () => {
  let component: ParameterBerlianComponent;
  let fixture: ComponentFixture<ParameterBerlianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterBerlianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterBerlianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
