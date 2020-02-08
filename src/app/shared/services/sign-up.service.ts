import { SignUpRecord } from './../models/sign-up.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { convertSnaps } from './db-utils';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
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

  getSignUpsByDate(date: Date): Observable<SignUpRecord[]> {
    return this.db.
      collection('signUps', ref => ref.where('gameDate', '==', date))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<SignUpRecord>(snaps)),
      );
  }

  saveUserSignUp(user: string, gameDate: Date): Observable<DocumentReference> {
    const timestamp: firestore.Timestamp = firestore.Timestamp.fromDate(gameDate);
    return from(this.db.collection('signUps').add({ date: firebase.firestore.Timestamp.fromDate(new Date()), gameDate: timestamp, user: user }));
  }
}
