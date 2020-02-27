import { firestore } from 'firebase';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

import { ChatMessage } from '../models/chat.model';
import { convertSnaps } from './db-utils';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  constructor(private db: AngularFirestore) {}

  getMessages(): Observable<ChatMessage[]> {
    return this.db
      .collection('chat', ref => ref.orderBy('timestamp', 'desc'))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<ChatMessage>(snaps)),
      );
  }

  saveMessage(team: string, msg: string): Observable<DocumentReference> {
    const chatMsg: ChatMessage = { user: team, message: msg, timestamp: firestore.Timestamp.fromMillis(Date.now()) };
    return from(this.db.collection('chat').add({ ...chatMsg }));
  }

  deleteAllChatMessages(): Observable<boolean> {
    return from(this.db.collection('chat').ref.get().then(resp => {
      const batch: firestore.WriteBatch = this.db.firestore.batch();
      resp.docs.forEach(userDocRef => {
        batch.delete(userDocRef.ref);
      });
      batch.commit().catch(err => false);
      return true;
    }));
  }


}
