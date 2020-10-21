import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInqueryProductEmasComponent } from './detail-inquery-product-emas.component';

describe('DetailInqueryProductEmasComponent', () => {
  let component: DetailInqueryProductEmasComponent;
  let fixture: ComponentFixture<DetailInqueryProductEmasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInqueryProductEmasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInqueryProductEmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
