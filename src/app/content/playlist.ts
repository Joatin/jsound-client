
export interface Playlist {
  date: Date;
  type: string;
  parts: PlaylistPart[];
}

export interface PlaylistContent {
  name: string;
  duration: number;
  startTime: Date;
  media: PlaylistMedia[];
}

export interface PlaylistPart {
  name: string;
  duration: number;
  startTime: Date;
  content: PlaylistContent[];
}

export interface PlaylistMedia {
  mime: string;
  url: string;
}
