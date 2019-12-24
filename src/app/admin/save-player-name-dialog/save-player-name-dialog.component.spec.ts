import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePlayerNameDialogComponent } from './save-player-name-dialog.component';

describe('SavePlayerNameDialogComponent', () => {
  let component: SavePlayerNameDialogComponent;
  let fixture: ComponentFixture<SavePlayerNameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavePlayerNameDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePlayerNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
