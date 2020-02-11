import { SignUpRecord } from './../models/sign-up.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { convertSnaps } from './db-utils';
import { Observable, from } from 'rxjs';
import { map, take } from 'rxjs/operators';
import firebase, { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
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

  saveUserSignUp(user: string, gameDate: Date, isPlaying: boolean, recordId: string): Observable<any> {
    // Update the record with this id
    if (recordId) {
      return from(this.db.doc(`signUps/${recordId}`).update({ date: firebase.firestore.Timestamp.fromDate(new Date()), isPlaying: isPlaying }));
    } else {
      const timestamp: firestore.Timestamp = firestore.Timestamp.fromDate(gameDate);
      return from(this.db.collection('signUps').add({ date: firebase.firestore.Timestamp.fromDate(new Date()), gameDate: timestamp, user: user, isPlaying: isPlaying }));
    }
  }

  updateDateOfSignUps(oldDate: Date, newDate: Date): Observable<boolean> {
    return from(this.db.collection('signUps', ref => ref.where('gameDate', '==', oldDate)).ref.get().then(resp => {
      const batch: firestore.WriteBatch = this.db.firestore.batch();
      resp.docs.forEach(userDocRef => {
        batch.update(userDocRef.ref, { gameDate: newDate });
      });
      batch.commit().catch(err => false);
      return true;
    }));
  }

  deleteSignUpsByDate(date: Date) {
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
