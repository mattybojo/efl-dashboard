import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';

import { ChatComponent } from './shared/chat/chat.component';
import { TeamPickerRoutingModule } from './team-picker-routing.module';
import { TeamPickerComponent } from './team-picker/team-picker.component';

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
    ChatComponent,
  ],
})
export class TeamPickerModule { }
