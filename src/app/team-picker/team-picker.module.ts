import { TeamPickerComponent } from './team-picker/team-picker.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamPickerRoutingModule } from './team-picker-routing.module';
import { ChatComponent } from './shared/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbButtonModule, NbInputModule } from '@nebular/theme';

@NgModule({
  declarations: [TeamPickerComponent, ChatComponent],
  imports: [
    TeamPickerRoutingModule,
    CommonModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
  ],
  exports: [
    ChatComponent
  ]
})
export class TeamPickerModule { }
