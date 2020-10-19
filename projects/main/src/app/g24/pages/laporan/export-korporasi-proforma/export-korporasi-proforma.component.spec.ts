import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportKorporasiProformaComponent } from './export-korporasi-proforma.component';

describe('ExportKorporasiProformaComponent', () => {
  let component: ExportKorporasiProformaComponent;
  let fixture: ComponentFixture<ExportKorporasiProformaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportKorporasiProformaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportKorporasiProformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
