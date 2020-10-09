import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMokerComponent } from './input-moker.component';

describe('InputMokerComponent', () => {
  let component: InputMokerComponent;
  let fixture: ComponentFixture<InputMokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputMokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputMokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
