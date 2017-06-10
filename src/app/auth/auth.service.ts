import { Observable } from 'rxjs';

export abstract class AuthService {
  public abstract login(username: string, password: string): Observable<Object>;
  public abstract logout(): Observable<void>;
}
