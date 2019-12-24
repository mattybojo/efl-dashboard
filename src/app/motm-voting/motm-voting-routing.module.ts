import { MotmVotingComponent } from './motm-voting/motm-voting.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [{
  path: '',
  component: MotmVotingComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class MotmVotingRoutingModule {}
