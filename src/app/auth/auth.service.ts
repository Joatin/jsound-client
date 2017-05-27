import { Observable } from 'rxjs';


export abstract class AuthService {
  abstract login(username: string, password: string): Observable<Object>;
  abstract logout(): Observable<void>;
}
