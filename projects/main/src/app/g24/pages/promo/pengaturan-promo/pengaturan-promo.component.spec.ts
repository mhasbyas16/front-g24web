import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PengaturanPromoComponent } from './pengaturan-promo.component';

describe('PengaturanPromoComponent', () => {
  let component: PengaturanPromoComponent;
  let fixture: ComponentFixture<PengaturanPromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PengaturanPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PengaturanPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
