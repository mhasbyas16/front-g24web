import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailItemPenerimaanGiftComponent } from './detail-item-penerimaan-gift.component';

describe('DetailItemPenerimaanGiftComponent', () => {
  let component: DetailItemPenerimaanGiftComponent;
  let fixture: ComponentFixture<DetailItemPenerimaanGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailItemPenerimaanGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailItemPenerimaanGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
