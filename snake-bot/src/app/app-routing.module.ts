import { LoginComponent } from './login/login.component';
import { ProfileGuardService } from './services/profile-guard.service';
import { GameComponent } from './game/game.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: GameComponent, canActivate: [ProfileGuardService] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
