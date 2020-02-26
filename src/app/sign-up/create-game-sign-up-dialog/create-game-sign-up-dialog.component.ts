import { FieldLocation } from './../../shared/models/lookup.model';
import { SignUpService } from './../../shared/services/sign-up.service';
import { LookupService } from './../../shared/services/lookup.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbDialogRef, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { take } from 'rxjs/operators';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'ngx-create-game-sign-up-dialog',
  templateUrl: './create-game-sign-up-dialog.component.html',
  styleUrls: ['./create-game-sign-up-dialog.component.scss']
})
export class CreateGameSignUpDialogComponent implements OnInit, OnDestroy {

  isoDateString: string;
  oldIsoDateString: string;
  dateString: string = null;
  timeString: string = '07:00';
  ampmString: string = 'AM';
  isSaving: boolean = false;
  location: string;
  id: string = null;
  saveGameData$: Subscription;
  fieldLocation$: Subscription;
  fieldList: FieldLocation[];
  selectedField: FieldLocation;

  constructor(private dialogRef: NbDialogRef<CreateGameSignUpDialogComponent>, private lookupService: LookupService,
    private signUpService: SignUpService, private toastrService: NbToastrService) {}

  ngOnInit(): void {
    if (this.isoDateString) {
      this.location = this.selectedField.name;
      this.oldIsoDateString = cloneDeep(this.isoDateString);

      let isoDateParts: string[] = this.isoDateString.split(new RegExp(/[-T:.]/, 'gi'));
      let hours: string = isoDateParts[3];

      // Hours are greater than 12, must be PM
      if (+hours > 12) {
        this.ampmString = 'PM';
        hours = (+isoDateParts[3] < 22) ? `0${+isoDateParts[3] - 12}` : `${+isoDateParts[3] - 12}`;
      }

      this.dateString = `${isoDateParts[1]}-${isoDateParts[2]}-${isoDateParts[0]}`;
      this.timeString = `${hours}:${isoDateParts[4]}`;
    } else {
      const newDate: Date = new Date();
      this.dateString = ('0'+ (newDate.getMonth()+1)).slice(-2) + '-' + ('0'+ newDate.getDate()).slice(-2) + '-' + newDate.getFullYear();
      this.location = 'Fallon';
      this.onSelectField(this.location);
    }
  }

  onSelectField($event) {
    this.selectedField = this.fieldList.find(x => x.name === $event);
  }

  saveGame() {
    const self = this;
    this.isSaving = true;
    const obsArray: Observable<any>[] = [];

    let dateParts: string[] = this.dateString.split('-');

    const timeParts: string[] = this.timeString.split(':');
    if (this.ampmString === 'PM') {
      this.timeString = `${(+timeParts[0] + 12) % 24}:${timeParts[1]}`;
      if (this.timeString.length === 4) {
        this.timeString = `0${this.timeString}`;
      }
    } else if (this.ampmString === 'AM' && timeParts[0] === '12') {
      this.timeString = `00:${timeParts[1]}`;
    }

    const isoDateString: string = `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}T${this.timeString}:00.000`;

    if (this.id) {
      obsArray.push(this.signUpService.updateDateOfSignUps(this.oldIsoDateString, isoDateString).pipe(take(1)));
    }
    obsArray.push(this.lookupService.saveLookupValue('signUpGame', `${isoDateString};${this.selectedField.name}`, this.id).pipe(take(1)));

    this.saveGameData$ = combineLatest(obsArray).subscribe(resp => {
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
    if (this.saveGameData$) {
      this.saveGameData$.unsubscribe();
    }

    if (this.fieldLocation$) {
      this.fieldLocation$.unsubscribe();
    }
  }
}
