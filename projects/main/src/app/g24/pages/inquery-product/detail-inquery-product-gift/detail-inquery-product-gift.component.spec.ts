import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInqueryProductGiftComponent } from './detail-inquery-product-gift.component';

describe('DetailInqueryProductGiftComponent', () => {
  let component: DetailInqueryProductGiftComponent;
  let fixture: ComponentFixture<DetailInqueryProductGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInqueryProductGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInqueryProductGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
