import { MotmVotesList } from './../models/team-picker.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TeamPicker } from '../models/team-picker.model';
import { Observable, from, of } from 'rxjs';
import { convertSnaps, convertSnap } from './db-utils';
import { map, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamPickerService {

  constructor(private db: AngularFirestore) {}

  getTeamData(): Observable<TeamPicker[]> {
    return this.db
      .collection('teamPicker')
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<TeamPicker>(snaps))
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
        map(snap => convertSnap<MotmVotesList>(snap))
      );
  }

  submitMotmVote(vote: MotmVotesList): Observable<void> {
    return from(this.db.doc(`motmVotes/${vote.id}`).update(Object.assign({}, vote)));
  }

  deleteAllMotmVotes(): Observable<void> {
    return this.getMotmVotes().pipe(take(1), switchMap((vote: MotmVotesList) => {
      return from(this.db.doc(`motmVotes/${vote.id}`).update({ id: vote.id, votes: '' }));
    }));
  }
}
