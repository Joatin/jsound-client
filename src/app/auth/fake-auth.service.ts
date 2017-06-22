import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export class FakeAuthService implements AuthService {
  public scheduleRenewal(): void {
    console.log('scheduleRenewal');
  }
  public handleAuthentication(): Observable<any> {
    return undefined;
  }

  public getRenewedToken(): Observable<string> {
    return undefined;
  }
  public login(): void {
    console.log('login');
  }

  public logout(): void {
    console.log('logout');
  }

  public isAuthenticated(): boolean {
    return undefined;
  }

}
