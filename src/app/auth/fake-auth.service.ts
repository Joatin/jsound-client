import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export class FakeAuthService implements AuthService {
  public login(): void {
    console.log('login');
  }

  public logout(): Observable<void> {
    return undefined;
  }

  public isAuthenticated(): boolean {
    return undefined;
  }

  public handleAuthentication(): void {
    console.log('handleAuthentication');
  }

}
