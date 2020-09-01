import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductJenisComponent } from './product-jenis.component';

describe('ProductJenisComponent', () => {
  let component: ProductJenisComponent;
  let fixture: ComponentFixture<ProductJenisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductJenisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductJenisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
