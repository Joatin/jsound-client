import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { getAuthorizedCongregations } from './congregation.selectors';
import { Congregation } from './congregation';
import { SelectCongregationAction } from './congregation.actions';

@Injectable()
export class CongregationGuardService implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store
      .select(getAuthorizedCongregations)
      .take(1)
      .map((congregations: Congregation[]) => {
      const result = congregations.find((con) => con.uniqueName === route.params['congregationId']);
      if (result) {
        this.store.dispatch(new SelectCongregationAction(result));
        return true;
      } else {
        this.router.navigate(['/404']);
        return false;
      }
    });
  }
}
