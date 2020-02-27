import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGameSignUpDialogComponent } from './create-game-sign-up-dialog.component';

describe('CreateGameSignUpDialogComponent', () => {
  let component: CreateGameSignUpDialogComponent;
  let fixture: ComponentFixture<CreateGameSignUpDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGameSignUpDialogComponent ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGameSignUpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
