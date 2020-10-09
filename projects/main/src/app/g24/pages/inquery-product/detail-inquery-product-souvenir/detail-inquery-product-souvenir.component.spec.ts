import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInqueryProductSouvenirComponent } from './detail-inquery-product-souvenir.component';

describe('DetailInqueryProductSouvenirComponent', () => {
  let component: DetailInqueryProductSouvenirComponent;
  let fixture: ComponentFixture<DetailInqueryProductSouvenirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInqueryProductSouvenirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInqueryProductSouvenirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
