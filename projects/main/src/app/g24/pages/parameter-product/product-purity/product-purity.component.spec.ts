import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPurityComponent } from './product-purity.component';

describe('ProductPurityComponent', () => {
  let component: ProductPurityComponent;
  let fixture: ComponentFixture<ProductPurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
