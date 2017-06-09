import { Observable } from 'rxjs';

import { Playlist } from './playlist';

export abstract class PlaylistService {
  public abstract getCurrent(): Observable<Playlist>;
}
