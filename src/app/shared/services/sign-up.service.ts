import { firestore } from 'firebase';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { SignUpRecord } from '../models/sign-up.model';
import { convertSnaps, getIsoString } from './db-utils';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {

  constructor(private db: AngularFirestore) {}

  getAllSignUps(): Observable<SignUpRecord[]> {
    return this.db.
      collection('signUps')
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<SignUpRecord>(snaps)),
      );
  }

  getAllSignUpsByDate(date: Date): Observable<SignUpRecord[]> {
    return this.db.
      collection('signUps', ref => ref.where('gameDate', '==', date))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<SignUpRecord>(snaps)),
      );
  }

  saveUserSignUp(user: string, gameDate: string, isPlaying: boolean, recordId: string): Observable<any> {
    if (recordId) {
      return from(this.db.doc(`signUps/${recordId}`).update({ date: getIsoString(new Date()), isPlaying: isPlaying }));
    } else {
      return from(this.db.collection('signUps').add({ date: getIsoString(new Date()), gameDate: gameDate, user: user, isPlaying: isPlaying }));
    }
  }

  updateDateOfSignUps(oldDate: string, newDate: string): Observable<boolean> {
    return from(this.db.collection('signUps', ref => ref.where('gameDate', '==', oldDate)).ref.get().then(resp => {
      const batch: firestore.WriteBatch = this.db.firestore.batch();
      resp.docs.forEach(userDocRef => {
        batch.update(userDocRef.ref, { gameDate: newDate });
      });
      batch.commit().catch(err => false);
      return true;
    }));
  }

  deleteSignUpsByDate(date: Date): Observable<boolean> {
    return from(this.db.collection('signUps', ref => ref.where('gameDate', '==', date)).ref.get().then(resp => {
      const batch: firestore.WriteBatch = this.db.firestore.batch();
      resp.docs.forEach(userDocRef => {
        batch.delete(userDocRef.ref);
      });
      batch.commit().catch(err => false);
      return true;
    }));
  }
}
