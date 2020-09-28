import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterBuybackComponent } from './parameter-buyback.component';

describe('ParameterBuybackComponent', () => {
  let component: ParameterBuybackComponent;
  let fixture: ComponentFixture<ParameterBuybackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterBuybackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterBuybackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
