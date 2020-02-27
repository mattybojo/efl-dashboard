import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamPickerComponent } from './team-picker/team-picker.component';

const routes: Routes = [{
  path: '',
  component: TeamPickerComponent,
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
})
export class TeamPickerRoutingModule {}
