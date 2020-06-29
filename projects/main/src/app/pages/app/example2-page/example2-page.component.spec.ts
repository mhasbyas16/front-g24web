import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Example2PageComponent } from './example2-page.component';

describe('Example2PageComponent', () => {
  let component: Example2PageComponent;
  let fixture: ComponentFixture<Example2PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Example2PageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Example2PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
