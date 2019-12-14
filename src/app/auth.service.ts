import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.userData = afAuth.authState;
  }

  signInUser(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  registerUser(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signOutUser() {
    return this.afAuth.auth.signOut();
  }
}
