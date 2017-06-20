import { AppState } from '../app.state';

export function getFirstName(state: AppState) {
  return state.auth.firstName;
}
