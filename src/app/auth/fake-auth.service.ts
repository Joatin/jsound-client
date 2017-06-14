import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export class FakeAuthService implements AuthService {
  public login(): void {
    console.log('login');
  }

  public logout(): void {
    console.log('logout');
  }

  public isAuthenticated(): boolean {
    return undefined;
  }

  public handleAuthentication(): void {
    console.log('handleAuthentication');
  }

}
