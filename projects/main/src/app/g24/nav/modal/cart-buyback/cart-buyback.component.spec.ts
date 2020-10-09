import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartBuybackComponent } from './cart-buyback.component';

describe('CartBuybackComponent', () => {
  let component: CartBuybackComponent;
  let fixture: ComponentFixture<CartBuybackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartBuybackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartBuybackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
