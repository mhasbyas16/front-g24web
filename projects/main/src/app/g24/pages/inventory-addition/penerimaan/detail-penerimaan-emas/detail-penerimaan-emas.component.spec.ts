import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPenerimaanEmasComponent } from './detail-penerimaan-emas.component';

describe('DetailPenerimaanEmasComponent', () => {
  let component: DetailPenerimaanEmasComponent;
  let fixture: ComponentFixture<DetailPenerimaanEmasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPenerimaanEmasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPenerimaanEmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
