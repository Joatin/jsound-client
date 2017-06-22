import { AuthService } from './auth.service';
import { Observable, Observer, Subscription } from 'rxjs';
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
    redirectUri: process.env.OAUTH_REDIRECT_URI,
    scope: 'openid profile email'
  });
  private refreshSubscription: Subscription;

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
    this.unscheduleRenewal();
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
        redirectUri: process.env.OAUTH_SILENT_CALLBACK_URI,
        usePostMessage: true
      }, (err, authResult) => {
          if (err) {
            // self.router.navigate(['/home']);
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

  public renewToken() {
    this.auth0.renewAuth({
      audience: '{YOUR_API_IDENTIFIER}',
      redirectUri: 'http://localhost:3001/silent',
      usePostMessage: true
    }, (err, result) => {
      if (err) {
        alert(`Could not get a new token using silent authentication (${err.error}).`);
      } else {
        alert(`Successfully renewed auth!`);
        this.setSession(result);
      }
    });
  }

  public scheduleRenewal() {
    if (!this.isAuthenticated()) {
      return;
    }
    this.unscheduleRenewal();

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

    const source = Observable.of(expiresAt).flatMap(
      () => {

        const now = Date.now();

        // Use the delay in a timer to
        // run the refresh at the proper time
        return Observable.timer(Math.max(1, expiresAt - now));
      });

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = source.subscribe(() => {
      this.renewToken();
      this.scheduleRenewal();
    });
  }

  public unscheduleRenewal() {
    if (!this.refreshSubscription) {
      return;
    }
    this.refreshSubscription.unsubscribe();
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    this.scheduleRenewal();
  }

}
