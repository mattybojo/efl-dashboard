import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeamPickerComponent } from './admin-team-picker.component';

describe('AdminTeamPickerComponent', () => {
  let component: AdminTeamPickerComponent;
  let fixture: ComponentFixture<AdminTeamPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTeamPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeamPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
