import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  DashboardStatsGraphsComponent,
} from './dashboard-stats-graphs/dashboard-stats-graphs.component';
import {
  DashboardStatsTableComponent,
} from './dashboard-stats-table/dashboard-stats-table.component';

const routes: Routes = [{
  path: '',
  component: DashboardStatsTableComponent,
}, {
  path: 'graphs',
  component: DashboardStatsGraphsComponent,
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
})
export class DashboardRoutingModule {}
