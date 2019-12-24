import { ChatMessage } from './../models/chat.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertSnaps } from './db-utils';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFirestore) {}

  getMessages(): Observable<ChatMessage[]> {
    return this.db
      .collection('chat', ref => ref.orderBy('timestamp', 'desc'))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<ChatMessage>(snaps))
      );
  }

  saveMessage(team: string, msg: string): Observable<DocumentReference> {
    const chatMsg: ChatMessage = { user: team, message: msg, timestamp: firestore.Timestamp.fromMillis(Date.now()) };
    return from(this.db.collection('chat').add({ ...chatMsg }));
  }
}
