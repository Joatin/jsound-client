import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule, ApplicationRef } from '@angular/core';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material 2
import '@angular/material/prebuilt-themes/purple-green.css';
import {
  MdInputModule, MdButtonModule, MdListModule, MdMenuModule, MdSliderModule,
  MdIconModule, MdDialogModule
} from '@angular/material';
import { MdSidenavModule } from '@angular/material';
import { MdToolbarModule } from '@angular/material';
import 'hammerjs';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';

// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { NoContentComponent } from './no-content/no-content.component';

import '../styles/styles.scss';
import '../styles/headings.css';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content/content.component';
import { AudioComponent } from './audio/audio.component';
import { ViewerComponent } from './viewer/viewer.component';
import { PlaylistComponent } from './content/playlist.component';
import { CurrentContentViewComponent } from './content/current-content-view.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterStoreModule } from '@ngrx/router-store';
import { MeetingComponent } from './meeting/meeting.component';
import { DurationPipe } from './util/duration.pipe';
import { ShowContentDialogComponent } from './content/show-content-dialog.component';
import { VgCoreModule } from 'videogular2/src/core/core';
import { contentReducerFunc } from './content/content.reducer';
import { AuthGuard } from './auth/auth-guard.service';
import { SelectCongregationComponent } from './congregation/select-congregation.component';
import { CallbackComponent } from './auth/callback/callback.component';
import { IndexComponent } from './home/index.component';
import { CongregationGuardService } from './congregation/congregation-guard.service';
import { authReducerFunc } from './auth/auth.reducer';
import { congregationReducerFunc } from './congregation/congregation.reducer';
import { layoutReducerFunc } from './layout/layout.reducer';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  AuthGuard,
  CongregationGuardService
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    NoContentComponent,
    LoginComponent,
    HomeComponent,
    LayoutComponent,
    ContentComponent,
    AudioComponent,
    ViewerComponent,
    PlaylistComponent,
    CurrentContentViewComponent,
    MeetingComponent,
    DurationPipe,
    ShowContentDialogComponent,
    SelectCongregationComponent,
    CallbackComponent,
    IndexComponent

  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules }),
    StoreModule.provideStore( {
      content: contentReducerFunc,
      auth: authReducerFunc,
      congregation: congregationReducerFunc,
      layout: layoutReducerFunc
    }, {
      router: {
        path: window.location.pathname + window.location.search
      }
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    RouterStoreModule.connectRouter(),
    MdInputModule,
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    MdListModule,
    MdMenuModule,
    MdSliderModule,
    MdIconModule,
    MdDialogModule,
    VgCoreModule
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS
  ],
  entryComponents: [
    ShowContentDialogComponent
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues  = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
