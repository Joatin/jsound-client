import { Component } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { getFirstName } from '../auth/auth.selectors';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  public firstName$: Observable<string>;

  constructor(
    public media: ObservableMedia,
    public authService: AuthService,
    private store: Store<AppState>
  ) {
    this.firstName$ = store.select(getFirstName);
  }

  public logout(): void {
    this.authService.logout();
  }
}
