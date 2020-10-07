import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterAcceptBuybackComponent } from './parameter-accept-buyback.component';

describe('ParameterAcceptBuybackComponent', () => {
  let component: ParameterAcceptBuybackComponent;
  let fixture: ComponentFixture<ParameterAcceptBuybackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterAcceptBuybackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterAcceptBuybackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
