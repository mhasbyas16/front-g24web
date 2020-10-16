import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PilihPembayaranComponent } from './pilih-pembayaran.component';

describe('PilihPembayaranComponent', () => {
  let component: PilihPembayaranComponent;
  let fixture: ComponentFixture<PilihPembayaranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PilihPembayaranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PilihPembayaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
