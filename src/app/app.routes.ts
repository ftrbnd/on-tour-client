import { Routes } from '@angular/router';
import { ArtistsPage } from './artists-page/artists-page';
import { VenuesPage } from './venues-page/venues-page';
import { ConcertsPage } from './concerts-page/concerts-page';

export const routes: Routes = [
  { path: 'artists', component: ArtistsPage },
  { path: 'venues', component: VenuesPage },
  { path: 'concerts', component: ConcertsPage },
];
