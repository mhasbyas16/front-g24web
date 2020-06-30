import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInitPerhiasanComponent } from './detail-init-perhiasan.component';

describe('DetailInitPerhiasanComponent', () => {
  let component: DetailInitPerhiasanComponent;
  let fixture: ComponentFixture<DetailInitPerhiasanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInitPerhiasanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInitPerhiasanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
