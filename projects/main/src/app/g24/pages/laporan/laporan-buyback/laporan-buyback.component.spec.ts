import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanBuybackComponent } from './laporan-buyback.component';

describe('LaporanBuybackComponent', () => {
  let component: LaporanBuybackComponent;
  let fixture: ComponentFixture<LaporanBuybackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaporanBuybackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaporanBuybackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
