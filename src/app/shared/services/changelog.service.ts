import { firestore } from 'firebase';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

import { Changelog } from '../models/changelog.model';
import { convertSnaps } from './db-utils';

@Injectable({
  providedIn: 'root',
})
export class ChangelogService {

  constructor(private db: AngularFirestore) {}

  getLogs(): Observable<Changelog[]> {
    return this.db
      .collection('changelog')
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Changelog>(snaps)),
      );
  }

  saveLog(msg: string, type: string): Observable<DocumentReference> {
    const newLog: Changelog = { type: type, msg: msg, date: firestore.Timestamp.fromMillis(Date.now()) };
    return from(this.db.collection('chat').add({ ...newLog }));
  }
}
