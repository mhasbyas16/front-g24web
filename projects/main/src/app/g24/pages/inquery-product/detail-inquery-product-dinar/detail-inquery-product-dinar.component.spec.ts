import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInqueryProductDinarComponent } from './detail-inquery-product-dinar.component';

describe('DetailInqueryProductDinarComponent', () => {
  let component: DetailInqueryProductDinarComponent;
  let fixture: ComponentFixture<DetailInqueryProductDinarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInqueryProductDinarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInqueryProductDinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
