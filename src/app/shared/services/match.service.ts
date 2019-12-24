import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Match } from '../models/match.model';
import { Observable, from } from 'rxjs';
import { convertSnaps, convertSnap } from './db-utils';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private db: AngularFirestore) {}

  getMatchByDate(date: string): Observable<Match> {
    return this.db
      .collection('matches', ref => ref.where('date', '==', date))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnap<Match>(snaps))
      );
  }

  getMatches(): Observable<Match[]> {
    return this.db
      .collection('matches', ref => ref.orderBy('date', 'desc'))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Match>(snaps))
      );
  }

  saveMatch(match: Match): Observable<DocumentReference> {
    return from(this.db.collection('matches').add({ ...match }));
  }

  updateMatch(match: Match): Observable<void> {
    match.darkTeam = Object.assign({}, match.darkTeam);
    match.whiteTeam = Object.assign({}, match.whiteTeam);
    return from(this.db.doc(`matches/${match.id}`).update(Object.assign({}, match)));
  }
}
