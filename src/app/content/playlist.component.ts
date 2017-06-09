import { Component } from '@angular/core';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Playlist, PlaylistPart } from './playlist';
import { getSelectedPlaylist } from './content.selectors';
import { MdDialog } from '@angular/material';
import { ShowContentDialogComponent } from './show-content-dialog.component';

@Component({
  selector: 'jsound-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {

  public playlist$: Observable<Playlist>;
  public playlistParts$: Observable<PlaylistPart[]>;

  constructor(
    private store: Store<AppState>,
    private dialog: MdDialog
  ) {
    this.playlist$ = store.select(getSelectedPlaylist);
    this.playlistParts$ = this.playlist$.map((list) => list.parts);
  }

  public openDialog(url: string) {
    this.dialog.open(ShowContentDialogComponent);
  }
}
