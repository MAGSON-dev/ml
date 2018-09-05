import { ProfileGuardService } from './services/profile-guard.service';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { FirebaseConfig } from '../environments/FirebaseConfig';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(FirebaseConfig),
  ],
  providers: [AngularFirestore, AuthService, AngularFireAuth, ProfileGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
