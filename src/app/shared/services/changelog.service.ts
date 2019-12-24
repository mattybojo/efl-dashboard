import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Changelog } from '../models/changelog.model';
import { map } from 'rxjs/operators';
import { convertSnaps } from './db-utils';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ChangelogService {

  constructor(private db: AngularFirestore) {}

  getLogs(): Observable<Changelog[]> {
    return this.db
      .collection('changelog')
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Changelog>(snaps))
      );
  }

  saveLog(msg: string, type: string): Observable<DocumentReference> {
    const newLog: Changelog = { type: type, msg: msg, date: firestore.Timestamp.fromMillis(Date.now()) };
    return from(this.db.collection('chat').add({ ...newLog }));
  }
}
