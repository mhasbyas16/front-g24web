import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenerimaanComponent } from './penerimaan.component';

describe('PenerimaanComponent', () => {
  let component: PenerimaanComponent;
  let fixture: ComponentFixture<PenerimaanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenerimaanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenerimaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
