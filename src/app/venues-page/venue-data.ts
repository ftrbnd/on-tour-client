import { ConcertData } from '../concerts-page/concert-data';

export interface VenueData {
  id: number;
  name: string;
  city: string;
  state: string;
  country: string;
  concerts: ConcertData[];
}
