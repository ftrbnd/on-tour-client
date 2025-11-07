import { ArtistData } from '../artists/artist-data';
import { VenueData } from '../venues/venue-data';

export interface ConcertData {
  id: number;
  date: Date;
  tour: string;
  venue: VenueData;
  artist: ArtistData;
  attendees: any[]; // TODO: add UserData interface
}
