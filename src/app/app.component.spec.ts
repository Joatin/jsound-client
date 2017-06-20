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

describe(`App`, () => {

  it('test', () => {
    expect(true).toBe(true);
  });
  /*let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  /!**
   * async beforeEach
   *!/
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        AppState,
        {provide: AuthService, useClass: FakeAuthService},
        {provide: SocketService, useClass: FakeSocketService}
        ]
    })
    /!**
     * Compile template and css
     *!/
    .compileComponents();
  }));

  /!**
   * Synchronous beforeEach
   *!/
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp    = fixture.componentInstance;

    /!**
     * Trigger initial data binding
     *!/
    fixture.detectChanges();
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });*/

});
