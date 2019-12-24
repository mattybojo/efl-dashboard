import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotmVotingComponent } from './motm-voting.component';

describe('MotmVotingComponent', () => {
  let component: MotmVotingComponent;
  let fixture: ComponentFixture<MotmVotingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotmVotingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotmVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
