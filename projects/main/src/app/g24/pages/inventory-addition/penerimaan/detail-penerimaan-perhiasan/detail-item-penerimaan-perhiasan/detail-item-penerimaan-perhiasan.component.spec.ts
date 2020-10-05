import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailItemPenerimaanPerhiasanComponent } from './detail-item-penerimaan-perhiasan.component';

describe('DetailItemPenerimaanPerhiasanComponent', () => {
  let component: DetailItemPenerimaanPerhiasanComponent;
  let fixture: ComponentFixture<DetailItemPenerimaanPerhiasanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailItemPenerimaanPerhiasanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailItemPenerimaanPerhiasanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
