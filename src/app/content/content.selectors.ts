import { AppState } from '../app.state';

export function getSelectedPlaylist(state: AppState) {
  return state.content.selectedPlaylist;
}
