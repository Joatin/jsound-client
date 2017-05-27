import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { NoContentComponent } from './no-content/no-content.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content/content.component';
import { AudioComponent } from './audio/audio.component';
import { ViewerComponent } from './viewer/viewer.component';
import { MeetingComponent } from './meeting/meeting.component';

export const ROUTES: Routes = [
  { path: 'login',      component: LoginComponent },
  { path: '',  component: LayoutComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'content', component: ContentComponent},
    {path: 'audio', component: AudioComponent},
    {path: 'viewers', component: ViewerComponent},
    {path: 'meeting', component: MeetingComponent}
  ] },
  { path: '**',    component: NoContentComponent },
];
