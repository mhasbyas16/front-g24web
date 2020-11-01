import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartBuybackManualLmComponent } from './cart-buyback-manual-lm.component';

describe('CartBuybackManualLmComponent', () => {
  let component: CartBuybackManualLmComponent;
  let fixture: ComponentFixture<CartBuybackManualLmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartBuybackManualLmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartBuybackManualLmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
