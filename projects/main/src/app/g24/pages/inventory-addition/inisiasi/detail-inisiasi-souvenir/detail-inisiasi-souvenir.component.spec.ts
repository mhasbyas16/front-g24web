import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInisiasiSouvenirComponent } from './detail-inisiasi-souvenir.component';

describe('DetailInisiasiSouvenirComponent', () => {
  let component: DetailInisiasiSouvenirComponent;
  let fixture: ComponentFixture<DetailInisiasiSouvenirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInisiasiSouvenirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInisiasiSouvenirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
