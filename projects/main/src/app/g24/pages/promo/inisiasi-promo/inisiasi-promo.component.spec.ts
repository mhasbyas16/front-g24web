import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InisiasiPromoComponent } from './inisiasi-promo.component';

describe('InisiasiPromoComponent', () => {
  let component: InisiasiPromoComponent;
  let fixture: ComponentFixture<InisiasiPromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InisiasiPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InisiasiPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
