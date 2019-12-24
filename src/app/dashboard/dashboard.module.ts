import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbSelectModule, NbCardModule } from '@nebular/theme';
import { DashboardStatsTableComponent } from './dashboard-stats-table/dashboard-stats-table.component';
import { DashboardStatsGraphsComponent } from './dashboard-stats-graphs/dashboard-stats-graphs.component';
import { ChartjsPieComponent } from './dashboard-stats-graphs/chartjs-pie.component';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
  declarations: [DashboardStatsTableComponent, DashboardStatsGraphsComponent, ChartjsPieComponent],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    Ng2SmartTableModule,
    NbSelectModule,
    ChartModule,
    NbCardModule,
  ]
})
export class DashboardModule { }
