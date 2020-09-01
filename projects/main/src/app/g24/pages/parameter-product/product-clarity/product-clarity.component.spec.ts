import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductClarityComponent } from './product-clarity.component';

describe('ProductClarityComponent', () => {
  let component: ProductClarityComponent;
  let fixture: ComponentFixture<ProductClarityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductClarityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductClarityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
