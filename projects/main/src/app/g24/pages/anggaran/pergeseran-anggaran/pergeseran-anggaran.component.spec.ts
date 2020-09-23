import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PergeseranAnggaranComponent } from './pergeseran-anggaran.component';

describe('PergeseranAnggaranComponent', () => {
  let component: PergeseranAnggaranComponent;
  let fixture: ComponentFixture<PergeseranAnggaranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PergeseranAnggaranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PergeseranAnggaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
