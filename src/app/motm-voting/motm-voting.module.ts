import { NbCardModule, NbButtonModule, NbDialogModule } from '@nebular/theme';
import { ThemeModule } from './../@theme/theme.module';
import { AdminModule } from './../admin/admin.module';
import { SavePlayerNameDialogComponent } from './../admin/save-player-name-dialog/save-player-name-dialog.component';
import { MotmVotingComponent } from './motm-voting/motm-voting.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotmVotingRoutingModule } from './motm-voting-routing.module';

@NgModule({
  declarations: [MotmVotingComponent],
  imports: [
    ThemeModule,
    CommonModule,
    MotmVotingRoutingModule,
    NbCardModule,
    NbButtonModule,
    AdminModule,
    NbDialogModule.forChild(),
  ],
  exports: [],
  entryComponents: [SavePlayerNameDialogComponent]
})
export class MotmVotingModule { }
