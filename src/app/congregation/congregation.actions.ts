/* tslint:disable:max-classes-per-file max-line-length */

import { Action } from '../util/action';
import { Congregation } from './congregation';

export class LoadCongregationsAction extends Action('[CONGREGATION] Load Congregations') {

}

export class LoadCongregationsSuccessAction extends Action('[CONGREGATION] Load Congregations Success') {

}

export class LoadCongregationsFailAction extends Action('[CONGREGATION] Load Congregations Success') {

}

export class SelectCongregationAction extends Action('[CONGREGATION] SelectCongregation') {

  constructor(
    public congregation: Congregation
  ) {
    super();
  }
}
