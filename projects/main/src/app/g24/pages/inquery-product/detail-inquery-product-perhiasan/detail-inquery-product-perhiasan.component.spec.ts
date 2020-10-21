import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInqueryProductPerhiasanComponent } from './detail-inquery-product-perhiasan.component';

describe('DetailInqueryProductPerhiasanComponent', () => {
  let component: DetailInqueryProductPerhiasanComponent;
  let fixture: ComponentFixture<DetailInqueryProductPerhiasanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInqueryProductPerhiasanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInqueryProductPerhiasanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
