import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInisiasiEmasComponent } from './detail-inisiasi-emas.component';

describe('DetailInisiasiEmasComponent', () => {
  let component: DetailInisiasiEmasComponent;
  let fixture: ComponentFixture<DetailInisiasiEmasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInisiasiEmasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInisiasiEmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
