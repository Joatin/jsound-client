import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/platform-browser';
import { Inject, Injectable } from '@angular/core';
import auth0 from 'auth0-js';
import { Router } from '@angular/router';

@Injectable()
export class OAuth2AuthService implements AuthService {
  private auth0 = new auth0.WebAuth({
    clientID: 'xaSx4TpSWIihZvAC0XqAxhWy4blxwzwA',
    domain: 'jsound.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://jsound.eu.auth0.com/userinfo',
    redirectUri: process.env['OAUTH_REDIRECT_URI'] || 'http://localhost:3000/callback',
    scope: 'openid'
  });

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: any,
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

  public handleAuthentication(): void {
    const router = this.router;
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

}
