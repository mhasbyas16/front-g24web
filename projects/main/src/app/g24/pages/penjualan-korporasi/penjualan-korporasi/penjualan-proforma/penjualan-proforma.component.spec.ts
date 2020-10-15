import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenjualanProformaComponent } from './penjualan-proforma.component';

describe('PenjualanProformaComponent', () => {
  let component: PenjualanProformaComponent;
  let fixture: ComponentFixture<PenjualanProformaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenjualanProformaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenjualanProformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
