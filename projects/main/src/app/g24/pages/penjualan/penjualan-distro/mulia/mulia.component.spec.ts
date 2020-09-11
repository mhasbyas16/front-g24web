import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuliaComponent } from './mulia.component';

describe('MuliaComponent', () => {
  let component: MuliaComponent;
  let fixture: ComponentFixture<MuliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuliaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
