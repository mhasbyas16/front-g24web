import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNasabahComponent } from './add-nasabah.component';

describe('AddNasabahComponent', () => {
  let component: AddNasabahComponent;
  let fixture: ComponentFixture<AddNasabahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNasabahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNasabahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
