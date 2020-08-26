import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPenerimaanSouvenirComponent } from './detail-penerimaan-souvenir.component';

describe('DetailPenerimaanSouvenirComponent', () => {
  let component: DetailPenerimaanSouvenirComponent;
  let fixture: ComponentFixture<DetailPenerimaanSouvenirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPenerimaanSouvenirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPenerimaanSouvenirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
