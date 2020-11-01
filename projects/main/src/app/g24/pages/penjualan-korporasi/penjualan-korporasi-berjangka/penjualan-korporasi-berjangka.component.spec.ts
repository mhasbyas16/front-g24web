import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenjualanKorporasiBerjangkaComponent } from './penjualan-korporasi-berjangka.component';

describe('PenjualanKorporasiBerjangkaComponent', () => {
  let component: PenjualanKorporasiBerjangkaComponent;
  let fixture: ComponentFixture<PenjualanKorporasiBerjangkaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenjualanKorporasiBerjangkaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenjualanKorporasiBerjangkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
