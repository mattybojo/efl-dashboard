import { UserData } from './../models/user-data.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { from, Observable, of, BehaviorSubject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { convertSnap } from './db-utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private userData$: BehaviorSubject<UserData> = new BehaviorSubject(null);
  private user$: BehaviorSubject<firebase.User> = new BehaviorSubject(null);

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    const self = this;
    this.afAuth.authState.pipe(
      switchMap((user: firebase.User) => {
        if (user) {
          self.user$.next(user);
          return self.getUserData(user.uid);
        } else {
          return of(null);
        }
      }),
    ).subscribe((userData: UserData) => {
      self.userData$.next(userData);
    });
  }

  getUserDataObservable(): BehaviorSubject<UserData> {
    return this.userData$;
  }

  getUser(): UserData {
    return this.userData$.value;
  }

  isAdmin(): Observable<boolean> {
    return this.userData$.pipe(map(userData => (userData) ? userData.isAdmin : false));
  }

  isLoggedIn(): boolean {
    return this.userData$.value != null;
  }

  logout(): void {
    this.afAuth.auth.signOut();
    this.userData$.next(null);
  }

  saveUserData(user: firebase.User, isNewUser: boolean): Observable<DocumentReference> {
    let userData: UserData = new UserData();
    if (user) {
      userData = this.setUserData(userData, user);
      if (isNewUser) {
        return from(this.db.collection('userData').add({ ...userData }));
      } else {
        this.getUserData(user.uid);
      }
    }
  }

  private getUserData(uid: string): Observable<UserData> {
    const self = this;
    return this.db.collection('userData', ref => ref.where('uid', '==', uid))
      .snapshotChanges()
      .pipe(
        map(snap => convertSnap<UserData>(snap)),
        tap((userData: UserData) => {
          const user: firebase.User = self.user$.value;
          const newData: UserData = self.setUserData(userData, user);
          //self.userData$.next(newData);
          if (user) {
            self.db.doc(`userData/${newData.id}`).update(newData);
          }
        })
      );
  }

  private setUserData(userData: UserData, user: firebase.User) {
    if (user) {
      userData.email = userData.email || user.email;
      userData.emailVerified = userData.emailVerified || user.emailVerified;
      userData.name = userData.name || user.displayName;
      userData.photoUrl = userData.photoUrl || user.photoURL;
      userData.uid = userData.uid || user.uid;
      userData.phoneNumber = userData.phoneNumber || user.phoneNumber;
      userData.isAdmin = userData.isAdmin || false;
    }

    return userData;
  }
}
