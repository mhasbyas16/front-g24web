import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PengajuanAnggaranComponent } from './pengajuan-anggaran.component';

describe('PengajuanAnggaranComponent', () => {
  let component: PengajuanAnggaranComponent;
  let fixture: ComponentFixture<PengajuanAnggaranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PengajuanAnggaranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PengajuanAnggaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
