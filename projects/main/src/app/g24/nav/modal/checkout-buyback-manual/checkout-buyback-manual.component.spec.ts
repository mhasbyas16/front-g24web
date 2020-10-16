import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutBuybackManualComponent } from './checkout-buyback-manual.component';

describe('CheckoutBuybackManualComponent', () => {
  let component: CheckoutBuybackManualComponent;
  let fixture: ComponentFixture<CheckoutBuybackManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutBuybackManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutBuybackManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
