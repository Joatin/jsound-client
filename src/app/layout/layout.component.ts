import { Component } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { getFirstName } from '../auth/auth.selectors';
import { getSelectedCongregation } from '../congregation/congregation.selectors';
import { Congregation } from '../congregation/congregation';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  public firstName$: Observable<string>;
  public congregationName$: Observable<string>;

  constructor(
    public media: ObservableMedia,
    public authService: AuthService,
    private store: Store<AppState>
  ) {
    this.firstName$ = store.select(getFirstName);
    this.congregationName$ = store.select(getSelectedCongregation)
      .map((congregation: Congregation) => {
      return congregation.name;
    });
  }

  public logout(): void {
    this.authService.logout();
  }
}
