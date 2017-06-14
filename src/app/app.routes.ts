import { Routes } from '@angular/router';

import { NoContentComponent } from './no-content/no-content.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content/content.component';
import { AudioComponent } from './audio/audio.component';
import { ViewerComponent } from './viewer/viewer.component';
import { MeetingComponent } from './meeting/meeting.component';
import { AuthGuard } from './auth/auth-guard.service';
import { SelectCongregationComponent } from './congregation/select-congregation.component';
import { CallbackComponent } from './auth/callback/callback.component';
import { IndexComponent } from './home/index.component';

export const ROUTES: Routes = [
  {path: '', component: IndexComponent},
  { path: 'callback', component: CallbackComponent },
  { path: 'congregations', canActivate: [AuthGuard], component: SelectCongregationComponent },
  { path: ':congregationId', component: LayoutComponent, canActivate: [AuthGuard],
    canActivateChild: [AuthGuard], children: [
    {path: 'home', component: HomeComponent},
    {path: 'content', component: ContentComponent},
    {path: 'audio', component: AudioComponent},
    {path: 'viewers', component: ViewerComponent},
    {path: 'meeting', component: MeetingComponent}
  ] },
  { path: '404', component: NoContentComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full'  },
];
