import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './index.component.html'
})
export class IndexComponent {

  constructor(
    public authService: AuthService
  ) {}

  public login() {
    this.authService.login();
  }

  public logout() {
    this.authService.logout();
  }
}
