import { Lookup } from './../models/lookup.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
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

  saveLookupValue(key: string, value: string): Observable<DocumentReference> {
    const lookup: Lookup = { key, value };
    return from(this.db.collection('lookup').add({ ...lookup }));
  }


}
