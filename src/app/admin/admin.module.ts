import { MatchesModule } from './../matches/matches.module';
import { TeamPickerModule } from './../team-picker/team-picker.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTeamPickerComponent } from './admin-team-picker/admin-team-picker.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminMatchesComponent } from './admin-matches/admin-matches.component';
import { SetScoresDialogComponent } from './set-scores-dialog/set-scores-dialog.component';
import { SaveMatchDialogComponent } from './save-match-dialog/save-match-dialog.component';
import { AdminMotmVotingComponent } from './admin-motm-voting/admin-motm-voting.component';
import { SavePlayerNameDialogComponent } from './save-player-name-dialog/save-player-name-dialog.component';
import { ViewMotmVotesDialogComponent } from './view-motm-votes-dialog/view-motm-votes-dialog.component';
import { NbDialogModule, NbInputModule, NbCardModule, NbButtonModule, NbIconModule, NbSelectModule } from '@nebular/theme';

@NgModule({
  declarations: [
    AdminTeamPickerComponent,
    SaveMatchDialogComponent,
    SetScoresDialogComponent,
    AdminMatchesComponent,
    AdminMotmVotingComponent,
    SavePlayerNameDialogComponent,
    ViewMotmVotesDialogComponent,
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
  ],
  exports: [
    SavePlayerNameDialogComponent,
  ],
  entryComponents: [
    SaveMatchDialogComponent,
    SetScoresDialogComponent,
    SaveMatchDialogComponent,
    SavePlayerNameDialogComponent,
    ViewMotmVotesDialogComponent,
  ],
})
export class AdminModule { }
