import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportLaporanBuybackManualComponent } from './export-laporan-buyback-manual.component';

describe('ExportLaporanBuybackManualComponent', () => {
  let component: ExportLaporanBuybackManualComponent;
  let fixture: ComponentFixture<ExportLaporanBuybackManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportLaporanBuybackManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportLaporanBuybackManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
