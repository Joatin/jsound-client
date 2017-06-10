import { Observable } from 'rxjs';

import { PlaylistService } from './playlist.service';
import { Playlist } from './playlist';

export class FakePlaylistService implements PlaylistService {

  public getCurrent(): Observable<Playlist> {
    return undefined;
  }

}
