import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [{
  path: '',
  component: DashboardComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class DashboardRoutingModule {}
