import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetScoresDialogComponent } from './set-scores-dialog.component';

describe('SetScoresDialogComponent', () => {
  let component: SetScoresDialogComponent;
  let fixture: ComponentFixture<SetScoresDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetScoresDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetScoresDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
