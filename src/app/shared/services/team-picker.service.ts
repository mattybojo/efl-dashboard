import { from, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { MotmVotesList, TeamPicker } from '../models/team-picker.model';
import { convertSnap, convertSnaps } from './db-utils';

@Injectable({
  providedIn: 'root',
})
export class TeamPickerService {

  constructor(private db: AngularFirestore) {}

  getTeamData(): Observable<TeamPicker[]> {
    return this.db
      .collection('teamPicker')
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<TeamPicker>(snaps)),
      );
  }

  saveTeamData(teamData: TeamPicker): Observable<any> {
    if (teamData.id) {
      return from(this.db.doc(`teamPicker/${teamData.id}`).update(Object.assign({}, teamData)));
    } else {
      return from(this.db.collection('matches').add(Object.assign({}, teamData)));
    }
  }

  getMotmVotes(): Observable<MotmVotesList> {
    return this.db
      .collection('motmVotes')
      .snapshotChanges()
      .pipe(
        map(snap => convertSnap<MotmVotesList>(snap)),
      );
  }

  submitMotmVote(vote: MotmVotesList): Observable<void> {
    return from(this.db.doc(`motmVotes/${vote.id}`).update(Object.assign({}, vote)));
  }

  deleteAllMotmVotes(): Observable<void> {
    return this.getMotmVotes().pipe(take(1), switchMap((vote: MotmVotesList) => from(this.db.doc(`motmVotes/${vote.id}`).update({ id: vote.id, votes: '' }))));
  }
}
