import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInisiasiPerhiasanComponent } from './detail-inisiasi-perhiasan.component';

describe('DetailInisiasiPerhiasanComponent', () => {
  let component: DetailInisiasiPerhiasanComponent;
  let fixture: ComponentFixture<DetailInisiasiPerhiasanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInisiasiPerhiasanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInisiasiPerhiasanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
