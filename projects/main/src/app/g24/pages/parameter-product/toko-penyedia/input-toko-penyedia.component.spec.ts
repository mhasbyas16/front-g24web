import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokoPenyediaComponent } from './toko-penyedia.component';

describe('TokoPenyediaComponent', () => {
  let component: TokoPenyediaComponent;
  let fixture: ComponentFixture<TokoPenyediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokoPenyediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokoPenyediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
