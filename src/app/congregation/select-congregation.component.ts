import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { getAuthorizedCongregations } from './congregation.selectors';
import { Congregation } from './congregation';

@Component({
  templateUrl: './select-congregation.component.html',
  styleUrls: [
    './select-congregation.component.scss'
  ]
})
export class SelectCongregationComponent {

  public congregations$: Observable<Congregation[]>;

  constructor(
    public authService: AuthService,
    private store: Store<AppState>
  ) {
    this.congregations$ = store.select(getAuthorizedCongregations);
  }

}
