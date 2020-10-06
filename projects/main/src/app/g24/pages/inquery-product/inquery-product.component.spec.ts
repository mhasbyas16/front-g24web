import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InqueryProductComponent } from './inquery-product.component';

describe('InqueryProductComponent', () => {
  let component: InqueryProductComponent;
  let fixture: ComponentFixture<InqueryProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InqueryProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InqueryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
