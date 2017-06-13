import { Component } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(public media: ObservableMedia) {
  }

  public logout() {
    return null;
  }
}
