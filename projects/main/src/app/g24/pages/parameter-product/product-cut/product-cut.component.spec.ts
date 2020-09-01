import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCutComponent } from './product-cut.component';

describe('ProductCutComponent', () => {
  let component: ProductCutComponent;
  let fixture: ComponentFixture<ProductCutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
