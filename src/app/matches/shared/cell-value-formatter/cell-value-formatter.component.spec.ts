import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellValueFormatterComponent } from './cell-value-formatter.component';

describe('CellValueFormatterComponent', () => {
  let component: CellValueFormatterComponent;
  let fixture: ComponentFixture<CellValueFormatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellValueFormatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellValueFormatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
