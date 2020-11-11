import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CetakTerimaMutasiComponent } from './cetak-terima-mutasi.component';

describe('CetakTerimaMutasiComponent', () => {
  let component: CetakTerimaMutasiComponent;
  let fixture: ComponentFixture<CetakTerimaMutasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CetakTerimaMutasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CetakTerimaMutasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
