import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPenjualanKorporasiComponent } from './list-penjualan-korporasi.component';

describe('ListPenjualanKorporasiComponent', () => {
  let component: ListPenjualanKorporasiComponent;
  let fixture: ComponentFixture<ListPenjualanKorporasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPenjualanKorporasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPenjualanKorporasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
