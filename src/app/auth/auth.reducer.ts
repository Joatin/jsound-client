import { AuthState } from './auth.state';
import { Reducer, Type } from '../util/reducer';
import { LoginAction } from './auth.actions';

export class AuthReducer extends Reducer<AuthState> {
  public initialState: AuthState = {
    isLoggedIn: false,
    firstName: null,
    pictureUrl: null
  };

  @Type(LoginAction)
  private handleLogin(action: LoginAction) {
    return {
      isLoggedIn: true,
      firstName: action.userData.firstName,
      pictureUrl: action.userData.pictureUrl
    };
  }

}

let reducer = new AuthReducer();
export function authReducerFunc(state, action) {
  return reducer.reduce(state, action);
}
