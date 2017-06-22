import { AppState } from '../app.state';

export function getAuthorizedCongregations(state: AppState) {
  return state.congregation.authorizedCongregations;
}

export function getSelectedCongregation(state: AppState) {
  return state.congregation.selectedCongregation;
}
