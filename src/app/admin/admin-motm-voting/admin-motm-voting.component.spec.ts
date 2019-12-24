import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMotmVotingComponent } from './admin-motm-voting.component';

describe('AdminMotmVotingComponent', () => {
  let component: AdminMotmVotingComponent;
  let fixture: ComponentFixture<AdminMotmVotingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMotmVotingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMotmVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
