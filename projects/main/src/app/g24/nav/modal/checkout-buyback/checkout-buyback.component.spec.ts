import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutBuybackComponent } from './checkout-buyback.component';

describe('CheckoutBuybackComponent', () => {
  let component: CheckoutBuybackComponent;
  let fixture: ComponentFixture<CheckoutBuybackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutBuybackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutBuybackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
