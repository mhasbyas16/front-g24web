import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenjualanKorporasiComponent } from './penjualan-korporasi.component';

describe('PenjualanKorporasiComponent', () => {
  let component: PenjualanKorporasiComponent;
  let fixture: ComponentFixture<PenjualanKorporasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenjualanKorporasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenjualanKorporasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
