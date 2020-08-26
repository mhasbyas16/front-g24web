import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailItemPenerimaanSouvenirComponent } from './detail-item-penerimaan-souvenir.component';

describe('DetailItemPenerimaanSouvenirComponent', () => {
  let component: DetailItemPenerimaanSouvenirComponent;
  let fixture: ComponentFixture<DetailItemPenerimaanSouvenirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailItemPenerimaanSouvenirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailItemPenerimaanSouvenirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
