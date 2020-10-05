import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDiamondColorComponent } from './product-diamond-color.component';

describe('ProductDiamondColorComponent', () => {
  let component: ProductDiamondColorComponent;
  let fixture: ComponentFixture<ProductDiamondColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDiamondColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDiamondColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
