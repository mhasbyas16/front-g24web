import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInisiasiBerlianComponent } from './detail-inisiasi-berlian.component';

describe('DetailInisiasiBerlianComponent', () => {
  let component: DetailInisiasiBerlianComponent;
  let fixture: ComponentFixture<DetailInisiasiBerlianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInisiasiBerlianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInisiasiBerlianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
