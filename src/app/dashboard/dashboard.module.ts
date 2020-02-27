import { ChartModule } from 'angular2-chartjs';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbCardModule, NbSelectModule } from '@nebular/theme';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChartjsPieComponent } from './dashboard-stats-graphs/chartjs-pie.component';
import {
  DashboardStatsGraphsComponent,
} from './dashboard-stats-graphs/dashboard-stats-graphs.component';
import {
  DashboardStatsTableComponent,
} from './dashboard-stats-table/dashboard-stats-table.component';

@NgModule({
  declarations: [DashboardStatsTableComponent, DashboardStatsGraphsComponent, ChartjsPieComponent],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    Ng2SmartTableModule,
    NbSelectModule,
    ChartModule,
    NbCardModule,
  ],
})
export class DashboardModule { }
