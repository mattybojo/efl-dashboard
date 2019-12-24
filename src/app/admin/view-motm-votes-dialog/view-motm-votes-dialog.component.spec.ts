import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMotmVotesDialogComponent } from './view-motm-votes-dialog.component';

describe('ViewMotmVotesDialogComponent', () => {
  let component: ViewMotmVotesDialogComponent;
  let fixture: ComponentFixture<ViewMotmVotesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMotmVotesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMotmVotesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
