import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MotmVotingComponent } from './motm-voting/motm-voting.component';

const routes: Routes = [{
  path: '',
  component: MotmVotingComponent,
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
})
export class MotmVotingRoutingModule {}
