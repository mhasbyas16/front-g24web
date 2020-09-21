import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportLaporanBuybackBycodeComponent } from './export-laporan-buyback-bycode.component';

describe('ExportLaporanBuybackBycodeComponent', () => {
  let component: ExportLaporanBuybackBycodeComponent;
  let fixture: ComponentFixture<ExportLaporanBuybackBycodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportLaporanBuybackBycodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportLaporanBuybackBycodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
