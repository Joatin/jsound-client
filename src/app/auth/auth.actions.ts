/* tslint:disable:max-classes-per-file */

import { Action } from '../util/action';

export class LoginAction extends Action('[AUTH] Login') {
  constructor(public userData: {
    firstName: string,
    pictureUrl: string
  }) {
    super();
  }
}

export class LogoutAction extends Action('[AUTH] Logout') {

}
