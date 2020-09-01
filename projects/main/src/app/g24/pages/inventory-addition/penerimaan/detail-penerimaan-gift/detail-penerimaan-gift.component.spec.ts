import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPenerimaanGiftComponent } from './detail-penerimaan-gift.component';

describe('DetailPenerimaanGiftComponent', () => {
  let component: DetailPenerimaanGiftComponent;
  let fixture: ComponentFixture<DetailPenerimaanGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPenerimaanGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPenerimaanGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
