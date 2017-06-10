import { RouterState } from '@ngrx/router-store';

import { ContentState } from './content/content.state';

export interface AppState {
  router: RouterState;
  content: ContentState;
}
