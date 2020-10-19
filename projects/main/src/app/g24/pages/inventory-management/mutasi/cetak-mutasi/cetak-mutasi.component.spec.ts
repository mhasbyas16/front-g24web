import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CetakMutasiComponent } from './cetak-mutasi.component';

describe('CetakMutasiComponent', () => {
  let component: CetakMutasiComponent;
  let fixture: ComponentFixture<CetakMutasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CetakMutasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CetakMutasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
