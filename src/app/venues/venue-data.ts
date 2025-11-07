import { ConcertData } from '../concerts/concert-data';

export interface VenueData {
  id: number;
  name: string;
  city: string;
  state: string;
  country: string;
  imageUrl: string;
  concerts: ConcertData[];
}
