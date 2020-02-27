import { Ng2SmartTableModule } from 'ng2-smart-table';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NbButtonModule, NbSelectModule } from '@nebular/theme';

import { MatchDetailComponent } from './match-detail/match-detail.component';
import { MatchSummaryLinkComponent } from './match-summary-link/match-summary-link.component';
import { MatchSummaryComponent } from './match-summary/match-summary.component';
import { MatchesRoutingModule } from './matches-routing.module';
import {
  CellValueFormatterComponent,
} from './shared/cell-value-formatter/cell-value-formatter.component';
import { TeamsheetsComponent } from './shared/teamsheets/teamsheets.component';

@NgModule({
  declarations: [TeamsheetsComponent, CellValueFormatterComponent, MatchSummaryComponent, MatchSummaryLinkComponent, MatchDetailComponent],
  imports: [
    MatchesRoutingModule,
    CommonModule,
    FontAwesomeModule,
    NbSelectModule,
    Ng2SmartTableModule,
    RouterModule,
    NbButtonModule,
  ],
  exports: [
    TeamsheetsComponent,
    MatchSummaryComponent,
    MatchSummaryLinkComponent,
  ],
  entryComponents: [CellValueFormatterComponent, MatchSummaryLinkComponent],
})
export class MatchesModule { }
