import { ChatComponent } from './shared/chat/chat.component';
import { TeamPickerComponent } from './team-picker/team-picker.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [{
  path: '',
  component: TeamPickerComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class TeamPickerRoutingModule {}
