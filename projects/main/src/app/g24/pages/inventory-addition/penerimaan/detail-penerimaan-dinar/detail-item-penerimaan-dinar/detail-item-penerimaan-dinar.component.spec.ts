import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailItemPenerimaanDinarComponent } from './detail-item-penerimaan-dinar.component';

describe('DetailItemPenerimaanDinarComponent', () => {
  let component: DetailItemPenerimaanDinarComponent;
  let fixture: ComponentFixture<DetailItemPenerimaanDinarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailItemPenerimaanDinarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailItemPenerimaanDinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
