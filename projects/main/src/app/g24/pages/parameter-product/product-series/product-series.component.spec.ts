import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSeriesComponent } from './product-series.component';

describe('ProductSeriesComponent', () => {
  let component: ProductSeriesComponent;
  let fixture: ComponentFixture<ProductSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
