import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMatchDetailComponent } from './admin-match-detail.component';

describe('AdminMatchDetailComponent', () => {
  let component: AdminMatchDetailComponent;
  let fixture: ComponentFixture<AdminMatchDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMatchDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
