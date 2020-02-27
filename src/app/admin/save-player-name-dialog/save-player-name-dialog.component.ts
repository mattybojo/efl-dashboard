import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'efl-save-player-name-dialog',
  templateUrl: './save-player-name-dialog.component.html',
  styleUrls: ['./save-player-name-dialog.component.scss'],
})
export class SavePlayerNameDialogComponent {

  dialogTitle: string;
  dialogInputLabel: string;
  playerName: string;

  constructor(private dialogRef: NbDialogRef<SavePlayerNameDialogComponent>) {}

  setPlayerName() {
    this.dialogRef.close(this.playerName);

  }

  closeDialog() {
    this.dialogRef.close();
  }
}
