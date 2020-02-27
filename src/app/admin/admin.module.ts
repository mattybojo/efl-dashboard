import { BlockUIModule } from 'ng-block-ui';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  NbButtonModule, NbCardModule, NbCheckboxModule, NbDialogModule, NbIconModule, NbInputModule,
  NbRadioModule, NbSelectModule,
} from '@nebular/theme';

import { MatchesModule } from '../matches/matches.module';
import { TeamPickerModule } from '../team-picker/team-picker.module';
import { AdminMatchDetailComponent } from './admin-match-detail/admin-match-detail.component';
import { AdminMotmVotingComponent } from './admin-motm-voting/admin-motm-voting.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminTeamPickerComponent } from './admin-team-picker/admin-team-picker.component';
import {
  ResetTeamPickerDialogComponent,
} from './reset-team-picker-dialog/reset-team-picker-dialog.component';
import { SaveMatchDialogComponent } from './save-match-dialog/save-match-dialog.component';
import {
  SavePlayerNameDialogComponent,
} from './save-player-name-dialog/save-player-name-dialog.component';
import { SetScoresDialogComponent } from './set-scores-dialog/set-scores-dialog.component';
import {
  ViewMotmVotesDialogComponent,
} from './view-motm-votes-dialog/view-motm-votes-dialog.component';

@NgModule({
  declarations: [
    AdminTeamPickerComponent,
    SaveMatchDialogComponent,
    SetScoresDialogComponent,
    AdminMotmVotingComponent,
    SavePlayerNameDialogComponent,
    ViewMotmVotesDialogComponent,
    AdminMatchDetailComponent,
    ResetTeamPickerDialogComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    TeamPickerModule,
    FontAwesomeModule,
    MatchesModule,
    FormsModule,
    NbDialogModule.forChild(),
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbSelectModule,
    RouterModule,
    NbCheckboxModule,
    NbRadioModule,
    BlockUIModule,
  ],
  exports: [
    SavePlayerNameDialogComponent,
  ],
  entryComponents: [
    SaveMatchDialogComponent,
    SetScoresDialogComponent,
    SavePlayerNameDialogComponent,
    ViewMotmVotesDialogComponent,
    ResetTeamPickerDialogComponent,
  ],
})
export class AdminModule { }
