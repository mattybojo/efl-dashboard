import { SignUpService } from './../../shared/services/sign-up.service';
import { LookupService } from './../../shared/services/lookup.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbDialogRef, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { take } from 'rxjs/operators';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';
import { createDateFromString } from '../../shared/services/db-utils';

@Component({
  selector: 'ngx-create-game-sign-up-dialog',
  templateUrl: './create-game-sign-up-dialog.component.html',
  styleUrls: ['./create-game-sign-up-dialog.component.scss']
})
export class CreateGameSignUpDialogComponent implements OnInit, OnDestroy {

  oldDateString: string;
  dateString: string = null;
  isSaving: boolean = false;
  id: string = null;
  subscription$: Subscription;

  constructor(private dialogRef: NbDialogRef<CreateGameSignUpDialogComponent>, private lookupService: LookupService,
    private signUpService: SignUpService, private toastrService: NbToastrService) {}

  ngOnInit(): void {
    if (this.dateString) {
      this.oldDateString = cloneDeep(this.dateString);
    }
  }

  saveGame() {
    const self = this;
    this.isSaving = true;
    const obsArray: Observable<any>[] = [];

    if (this.id) {
      obsArray.push(this.signUpService.updateDateOfSignUps(createDateFromString(this.oldDateString), createDateFromString(this.dateString)));
    }
    obsArray.push(this.lookupService.saveLookupValue('signUpGame', this.dateString, this.id).pipe(take(1)));

    this.subscription$ = combineLatest(obsArray).subscribe(resp => {
      if (resp.length === 2 && !resp[0]) {
        self.toastrService.danger('Failed to move individual sign-ups.', 'Error', {
          duration: 3000,
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
        });
      } else if (this.id) {
        self.toastrService.success('Moved game and individual sign-ups.', 'Success', {
          duration: 3000,
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
        });
      } else {
        self.toastrService.success('Created new sign-up.', 'Success', {
          duration: 3000,
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
        });
      }
      self.dialogRef.close();
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
