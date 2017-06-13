import { Observable } from 'rxjs';

export abstract class AuthService {
  public abstract login(): void;
  public abstract logout(): Observable<void>;
  public abstract isAuthenticated(): boolean;
  public abstract handleAuthentication(): void;
}
