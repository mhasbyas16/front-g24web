import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailKonversiComponent } from './detail-konversi.component';

describe('DetailKonversiComponent', () => {
  let component: DetailKonversiComponent;
  let fixture: ComponentFixture<DetailKonversiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailKonversiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailKonversiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
