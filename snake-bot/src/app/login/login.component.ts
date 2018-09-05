import { UserInterface } from './../extra/UserInterface';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  sub: Subscription;

  constructor(public auth: AuthService, public router: Router, public afs: AngularFirestore) {
    console.log('login component is running');
  }

  ngOnInit() {
    this.sub = this.auth.user$.subscribe((user) => {
      console.log('the user is now authenticated', {user});
      if (user) {
        this.afs.doc<UserInterface>('users/' + user.uid).set({
          name: user.displayName,
          kr: 0,
          highscore: 0,
        }, {merge: true});
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  signInWithGoogle() {
    document.getElementById('progressbar').style.display = 'block';
    this.auth.signInWithGoogle();
  }


}
