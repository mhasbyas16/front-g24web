import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManajemenRegionalComponent } from './manajemen-regional.component';

describe('ManajemenRegionalComponent', () => {
  let component: ManajemenRegionalComponent;
  let fixture: ComponentFixture<ManajemenRegionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManajemenRegionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManajemenRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
