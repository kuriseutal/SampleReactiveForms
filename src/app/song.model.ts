export interface Song {
  id: number;
  isFavorited: boolean;
  isLyricsShown: boolean;
  img: string;
  title: string;
  artist: string;
  album: string;
  date: string;
  lyrics?: string;
  chords?: string;
  tags: string[];
}
