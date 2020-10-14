import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanBuybackManualComponent } from './laporan-buyback-manual.component';

describe('LaporanBuybackManualComponent', () => {
  let component: LaporanBuybackManualComponent;
  let fixture: ComponentFixture<LaporanBuybackManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaporanBuybackManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaporanBuybackManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
