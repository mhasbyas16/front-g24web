import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGoldColorComponent } from './product-gold-color.component';

describe('ProductGoldColorComponent', () => {
  let component: ProductGoldColorComponent;
  let fixture: ComponentFixture<ProductGoldColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGoldColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGoldColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
