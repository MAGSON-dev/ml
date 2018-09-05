import { UserInterface } from './../extra/UserInterface';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  userData$: Observable<UserInterface>;

  constructor(private afAuth: AngularFireAuth, public router: Router, afs: AngularFirestore) {
    this.user$ = afAuth.authState;
    this.userData$ = this.user$.pipe(switchMap(user => afs.doc<UserInterface>('users/' + user.uid).valueChanges()));
  }

  signInWithGoogle() {
    return this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  logOut() {
    this.afAuth.auth.signOut().then(() => this.router.navigate(['login']));
  }
}
