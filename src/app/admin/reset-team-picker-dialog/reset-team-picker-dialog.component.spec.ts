import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetTeamPickerDialogComponent } from './reset-team-picker-dialog.component';

describe('ResetTeamPickerDialogComponent', () => {
  let component: ResetTeamPickerDialogComponent;
  let fixture: ComponentFixture<ResetTeamPickerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetTeamPickerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetTeamPickerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
