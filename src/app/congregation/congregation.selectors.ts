import { AppState } from '../app.state';

export function getAuthorizedCongregations(state: AppState) {
  return state.congregation.authorizedCongregations;
}
