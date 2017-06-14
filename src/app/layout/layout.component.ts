import { Component } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(
    public media: ObservableMedia,
    public authService: AuthService
  ) {
  }

  public logout(): void {
    this.authService.logout();
  }
}
