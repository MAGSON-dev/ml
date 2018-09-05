import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

// This is service is used for redirecting non-signed in user to the login page when they
// try to access the profile page

@Injectable()
export class ProfileGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(map(user => {
      // if the user is signed in
      if (user) { return true; }
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }
      });

      // if the user is not signed in
      return false;
    }));
  }
}
