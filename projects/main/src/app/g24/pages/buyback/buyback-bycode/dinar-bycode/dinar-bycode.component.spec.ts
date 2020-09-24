import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinarBycodeComponent } from './dinar-bycode.component';

describe('DinarBycodeComponent', () => {
  let component: DinarBycodeComponent;
  let fixture: ComponentFixture<DinarBycodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinarBycodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinarBycodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
