import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RekeningKoranComponent } from './rekening-koran.component';

describe('RekeningKoranComponent', () => {
  let component: RekeningKoranComponent;
  let fixture: ComponentFixture<RekeningKoranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RekeningKoranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RekeningKoranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
