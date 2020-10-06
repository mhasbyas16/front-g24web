import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInqueryProductPermataComponent } from './detail-inquery-product-permata.component';

describe('DetailInqueryProductPermataComponent', () => {
  let component: DetailInqueryProductPermataComponent;
  let fixture: ComponentFixture<DetailInqueryProductPermataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInqueryProductPermataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInqueryProductPermataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
