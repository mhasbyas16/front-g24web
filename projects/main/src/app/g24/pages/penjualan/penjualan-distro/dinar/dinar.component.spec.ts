import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinarComponent } from './dinar.component';

describe('DinarComponent', () => {
  let component: DinarComponent;
  let fixture: ComponentFixture<DinarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
