import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Lookup } from '../models/lookup.model';
import { Observable } from 'rxjs';
import { convertSnap, convertSnaps } from './db-utils';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private db: AngularFirestore) {}

  getLookupValue(key: string): Observable<Lookup> {
    return this.db.
      collection('lookup', ref => ref.where('key', '==', key))
      .snapshotChanges()
      .pipe(
        map(snap => convertSnap<Lookup>(snap)),
      );
  }

  getLookupValues(key: string): Observable<Lookup[]> {
    return this.db.
      collection('lookup', ref => ref.where('key', '==', key))
      .snapshotChanges()
      .pipe(
        map(snap => convertSnaps<Lookup>(snap)),
      );
  }
}
