import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { NbDialogRef } from '@nebular/theme';

import { Match } from '../../shared/models/match.model';
import { MatchService } from '../../shared/services/match.service';

@Component({
  selector: 'efl-save-match-dialog',
  templateUrl: './save-match-dialog.component.html',
  styleUrls: ['./save-match-dialog.component.scss'],
})
export class SaveMatchDialogComponent implements OnInit, OnDestroy {

  whiteTeam: string;
  darkTeam: string;
  match: Match;
  isSaving: boolean = false;

  subscription$: Subscription;

  constructor(private dialogRef: NbDialogRef<SaveMatchDialogComponent>, private matchService: MatchService) {}

  ngOnInit() {
    this.match = {
      date: '',
      whiteTeam: {
        players: this.whiteTeam,
        goals: '',
      },
      darkTeam: {
        players: this.darkTeam,
        goals: '',
      },
      motm: '',
    };
  }

  saveMatch() {
    this.isSaving = true;
    this.subscription$ = this.matchService.saveMatch(this.match).subscribe((resp: DocumentReference) => {
      this.isSaving = false;
      this.dialogRef.close();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
