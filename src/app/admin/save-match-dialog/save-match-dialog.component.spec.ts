import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveMatchDialogComponent } from './save-match-dialog.component';

describe('SaveMatchDialogComponent', () => {
  let component: SaveMatchDialogComponent;
  let fixture: ComponentFixture<SaveMatchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveMatchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveMatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
