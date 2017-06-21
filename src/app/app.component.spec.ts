import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

/**
 * Load the implementations that should be tested
 */
import { AppComponent } from './app.component';
import { AppState } from './app.service';
import { AuthService } from './auth/auth.service';
import { FakeAuthService } from './auth/fake-auth.service';
import { FakeSocketService } from './socket/fake-socket.service';
import { SocketService } from './socket/socket.service';
import { StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';

describe(`App`, () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let routerStub;
  let authStub;
  /**
   * async beforeEach
   */
  beforeEach(async(() => {
    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };
    authStub = {
      handleAuthentication: jasmine.createSpy('handleAuthentication').and.callFake(() => {
        return {
          subscribe: jasmine.createSpy('subscribe')
        };
      }),
      isAuthenticated: jasmine.createSpy('isAuthenticated')
    };
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [
        StoreModule.provideStore({})
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        AppState,
        {provide: AuthService, useValue: authStub},
        {provide: SocketService, useClass: FakeSocketService},
        { provide: Router, useValue: routerStub }
      ]
    })
    /**
     * Compile template and css
     */
    .compileComponents();
  }));

  /**
   * Synchronous beforeEach
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp    = fixture.componentInstance;

    /**
     * Trigger initial data binding
     */
    fixture.detectChanges();
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

});
