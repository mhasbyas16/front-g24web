import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNasabahComponent } from './search-nasabah.component';

describe('SearchNasabahComponent', () => {
  let component: SearchNasabahComponent;
  let fixture: ComponentFixture<SearchNasabahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchNasabahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNasabahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
