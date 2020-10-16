import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportLaporanComponent } from './export-laporan.component';

describe('ExportLaporanComponent', () => {
  let component: ExportLaporanComponent;
  let fixture: ComponentFixture<ExportLaporanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportLaporanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportLaporanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
