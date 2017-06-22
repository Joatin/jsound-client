import { Observable } from 'rxjs';

export abstract class AuthService {
  public abstract login(): void;
  public abstract logout(): void;
  public abstract isAuthenticated(): boolean;
  public abstract handleAuthentication(): Observable<any>;
  public abstract getRenewedToken(): Observable<string>;
  public abstract scheduleRenewal(): void;
}
