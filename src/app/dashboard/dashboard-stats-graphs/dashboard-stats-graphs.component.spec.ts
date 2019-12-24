import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStatsGraphsComponent } from './dashboard-stats-graphs.component';

describe('DashboardStatsGraphsComponent', () => {
  let component: DashboardStatsGraphsComponent;
  let fixture: ComponentFixture<DashboardStatsGraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardStatsGraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardStatsGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
