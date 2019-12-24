import { DashboardStatsTableComponent } from './dashboard-stats-table/dashboard-stats-table.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardStatsGraphsComponent } from './dashboard-stats-graphs/dashboard-stats-graphs.component';

const routes: Routes = [{
  path: '',
  component: DashboardStatsTableComponent,
}, {
  path: 'graphs',
  component: DashboardStatsGraphsComponent,
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class DashboardRoutingModule {}
