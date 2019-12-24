import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStatsTableComponent } from './dashboard-stats-table.component';

describe('DashboardStatsTableComponent', () => {
  let component: DashboardStatsTableComponent;
  let fixture: ComponentFixture<DashboardStatsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardStatsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardStatsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
