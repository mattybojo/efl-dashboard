import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsheetsComponent } from './teamsheets.component';

describe('TeamsheetsComponent', () => {
  let component: TeamsheetsComponent;
  let fixture: ComponentFixture<TeamsheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsheetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
