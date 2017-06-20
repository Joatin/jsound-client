import { AuthService } from './auth.service';
import { Observable, Observer } from 'rxjs';
import { DOCUMENT } from '@angular/platform-browser';
import { Inject, Injectable } from '@angular/core';
import auth0 from 'auth0-js';
import { Router } from '@angular/router';
import { SocketService } from '../socket/socket.service';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { LoginAction } from './auth.actions';

@Injectable()
export class OAuth2AuthService implements AuthService {
  private auth0 = new auth0.WebAuth({
    clientID: 'xaSx4TpSWIihZvAC0XqAxhWy4blxwzwA',
    domain: 'jsound.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'http://localhost:3100',
    redirectUri: process.env.OAUTH_REDIRECT_URI || 'http://localhost:3000/callback',
    scope: 'openid profile email'
  });

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: any,
    private store: Store<AppState>
  ) {

  }

  public login(): void {
    this.auth0.authorize();
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['/']);
  }

  public handleAuthentication(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          observer.next(authResult);
          observer.complete();
        } else if (err) {
          observer.error(err);
        }
      });
    });
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getRenewedToken(): Observable<string> {
    console.log('Calling get renewed');
    const self = this;
    return Observable.create((observer: Observer<string>) => {
      self.auth0.renewAuth({
        redirectUri: 'http://localhost:3000/silent-callback.html',
        usePostMessage: true
      }, (err, authResult) => {
          if (err) {
            self.router.navigate(['/home']);
            console.log(err);
          } else {
            self.setSession(authResult);
            self.store.dispatch(new LoginAction({
              firstName: authResult.idTokenPayload.given_name,
              pictureUrl: authResult.idTokenPayload.picture
            }));
            observer.next(authResult.accessToken);
            observer.complete();
          }
      });
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

}
