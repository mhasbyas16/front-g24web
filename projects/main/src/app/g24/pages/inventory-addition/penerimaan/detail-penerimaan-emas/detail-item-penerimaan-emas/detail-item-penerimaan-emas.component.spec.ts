import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailItemPenerimaanEmasComponent } from './detail-item-penerimaan-emas.component';

describe('DetailItemPenerimaanEmasComponent', () => {
  let component: DetailItemPenerimaanEmasComponent;
  let fixture: ComponentFixture<DetailItemPenerimaanEmasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailItemPenerimaanEmasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailItemPenerimaanEmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
