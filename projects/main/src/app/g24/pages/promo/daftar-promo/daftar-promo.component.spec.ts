import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarPromoComponent } from './daftar-promo.component';

describe('DaftarPromoComponent', () => {
  let component: DaftarPromoComponent;
  let fixture: ComponentFixture<DaftarPromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaftarPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaftarPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
