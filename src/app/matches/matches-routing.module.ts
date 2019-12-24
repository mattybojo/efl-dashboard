import { MatchesComponent } from './matches/matches.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [{
  path: '',
  component: MatchesComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class MatchesRoutingModule {}
