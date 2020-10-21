import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InisiasiPenerimaanBahanBakuComponent } from './inisiasi-penerimaan-bahan-baku.component';

describe('InisiasiPenerimaanBahanBakuComponent', () => {
  let component: InisiasiPenerimaanBahanBakuComponent;
  let fixture: ComponentFixture<InisiasiPenerimaanBahanBakuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InisiasiPenerimaanBahanBakuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InisiasiPenerimaanBahanBakuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
