import { LookupService } from './../../shared/services/lookup.service';
import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ngx-create-game-sign-up-dialog',
  templateUrl: './create-game-sign-up-dialog.component.html',
  styleUrls: ['./create-game-sign-up-dialog.component.scss']
})
export class CreateGameSignUpDialogComponent {

  dateString: string;
  isSaving: boolean = false;

  constructor(private dialogRef: NbDialogRef<CreateGameSignUpDialogComponent>, private lookupService: LookupService) {}

  saveGame() {
    this.isSaving = true;
    this.lookupService.saveLookupValue('signUpGame', this.dateString).pipe(take(1)).subscribe(resp => {
      this.isSaving = false;
      this.dialogRef.close();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
