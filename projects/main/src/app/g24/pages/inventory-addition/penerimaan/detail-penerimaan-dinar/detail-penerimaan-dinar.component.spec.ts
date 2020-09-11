import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPenerimaanDinarComponent } from './detail-penerimaan-dinar.component';

describe('DetailPenerimaanDinarComponent', () => {
  let component: DetailPenerimaanDinarComponent;
  let fixture: ComponentFixture<DetailPenerimaanDinarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPenerimaanDinarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPenerimaanDinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
