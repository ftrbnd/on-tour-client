import { ConcertData } from '../concerts/concert-data';

export interface ArtistData {
  id: number;
  spotifyId: string;
  name: string;
  imageUrl: string;
  url: string;
  concerts: ConcertData[];
}
