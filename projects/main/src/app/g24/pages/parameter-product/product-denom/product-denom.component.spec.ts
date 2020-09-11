import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDenomComponent } from './product-denom.component';

describe('ProductDenomComponent', () => {
  let component: ProductDenomComponent;
  let fixture: ComponentFixture<ProductDenomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDenomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDenomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
