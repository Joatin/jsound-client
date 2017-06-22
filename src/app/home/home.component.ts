import { Component } from '@angular/core';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getSelectedCongregation } from '../congregation/congregation.selectors';
import { Congregation } from '../congregation/congregation';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {

  public congregationName$: Observable<string>;

  private congregation$: Observable<Congregation>;

  constructor(
    private store: Store<AppState>
  ) {
    this.congregation$ = store.select(getSelectedCongregation);
    this.congregationName$ = this.congregation$.map((congregation: Congregation) => {
      return congregation.name;
    });
  }
}
