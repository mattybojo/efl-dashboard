import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Player, PlayerStats } from '../models/player.model';
import { convertSnap, convertSnaps } from './db-utils';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private db: AngularFirestore) {}

  createPlayer(playerName: string) {
    return from(this.db.collection('players').add({ name: playerName }));
  }

  getPlayers(): Observable<Player[]> {
    return this.db.
      collection('players')
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Player>(snaps)),
      );
  }

  getPlayerStats(season: string, name: string): Observable<PlayerStats> {
    if (!name) {
      return of(null);
    }
    return this.db.
      collection(season, ref => ref.where('name', '==', name))
      .snapshotChanges()
      .pipe(
        map(snap => (snap && snap.length) ? convertSnap<PlayerStats>(snap) : null),
      );
  }

  getAllPlayerStats(season: string): Observable<PlayerStats[]> {
    return this.db.
      collection(season)
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<PlayerStats>(snaps)),
      );
  }
}
