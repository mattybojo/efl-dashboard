import { Component, OnInit, Inject } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { Match } from '../../shared/models/match.model';
import { MatchService } from '../../shared/services/match.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-save-match-dialog',
  templateUrl: './save-match-dialog.component.html',
  styleUrls: ['./save-match-dialog.component.scss']
})
export class SaveMatchDialogComponent implements OnInit {

  whiteTeam: string;
  darkTeam: string;
  match: Match;
  isSaving: boolean = false;

  constructor(private dialogRef: NbDialogRef<SaveMatchDialogComponent>, private matchService: MatchService) {}

  ngOnInit() {
    this.match = {
      date: '',
      whiteTeam: {
        players: this.whiteTeam,
        goals: ''
      },
      darkTeam: {
        players: this.darkTeam,
        goals: ''
      },
      motm: ''
    };
  }

  saveMatch() {
    this.isSaving = true;
    this.matchService.saveMatch(this.match).subscribe((resp: DocumentReference) => {
      this.isSaving = false;
      this.dialogRef.close();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
