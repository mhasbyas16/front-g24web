import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InisiasiComponent } from './inisiasi.component';

describe('InisiasiComponent', () => {
  let component: InisiasiComponent;
  let fixture: ComponentFixture<InisiasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InisiasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InisiasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
