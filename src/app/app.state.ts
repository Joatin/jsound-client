import { RouterState } from '@ngrx/router-store';

import { ContentState } from './content/content.state';
import { AuthState } from './auth/auth.state';
import { CongregationState } from './congregation/congregation.state';
import { LayoutState } from './layout/layout.state';

export interface AppState {
  router: RouterState;
  content: ContentState;
  auth: AuthState;
  congregation: CongregationState;
  layout: LayoutState;
}
