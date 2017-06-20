/**
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import { AuthService } from './auth/auth.service';
import { SocketService } from './socket/socket.service';
import { Store } from '@ngrx/store';
import { LoginAction } from './auth/auth.actions';
import * as jwt from 'jsonwebtoken';
import { Router } from '@angular/router';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState,
    public auth: AuthService,
    private socket: SocketService,
    private store: Store<AppState>,
    private router: Router,
  ) {
    auth.handleAuthentication().subscribe((authResult) => {
      window.location.hash = '';
      this.store.dispatch(new LoginAction({
        firstName: authResult.idTokenPayload.given_name,
        pictureUrl: authResult.idTokenPayload.picture
      }));
      socket.init(authResult.accessToken);
      router.navigate(['/congregations']);

    }, (error) => {
      this.router.navigate(['/home']);
      console.log(error);
    });

    if (auth.isAuthenticated()) {
      const idToken = localStorage.getItem('id_token');
      const idTokenPayload: any = jwt.decode(idToken);
      console.log(idTokenPayload);
      this.store.dispatch(new LoginAction({
        firstName: idTokenPayload.given_name,
        pictureUrl: idTokenPayload.picture
      }));
      socket.init(localStorage.getItem('access_token'));
    }

  }

}
