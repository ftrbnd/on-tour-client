import { Routes } from '@angular/router';
import { ArtistsPage } from './artists/artists-page/artists-page';
import { VenuesPage } from './venues/venues-page/venues-page';
import { ConcertsPage } from './concerts/concerts-page/concerts-page';
import { ArtistPage } from './artists/artist-page/artist-page';
import { VenuePage } from './venues/venue-page/venue-page';

export const routes: Routes = [
  { path: 'artists', component: ArtistsPage },
  { path: 'artists/:id', component: ArtistPage },
  { path: 'venues', component: VenuesPage },
  { path: 'venues/:id', component: VenuePage },
  { path: 'concerts', component: ConcertsPage },
];
