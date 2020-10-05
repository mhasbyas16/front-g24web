import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPenerimaanPerhiasanComponent } from './detail-penerimaan-perhiasan.component';

describe('DetailPenerimaanPerhiasanComponent', () => {
  let component: DetailPenerimaanPerhiasanComponent;
  let fixture: ComponentFixture<DetailPenerimaanPerhiasanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPenerimaanPerhiasanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPenerimaanPerhiasanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
