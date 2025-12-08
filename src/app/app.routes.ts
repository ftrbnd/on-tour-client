import { Routes } from '@angular/router';
import { ArtistsPage } from './artists/artists-page/artists-page';
import { VenuesPage } from './venues/venues-page/venues-page';
import { ConcertsPage } from './concerts/concerts-page/concerts-page';
import { ArtistPage } from './artists/artist-page/artist-page';
import { VenuePage } from './venues/venue-page/venue-page';
import { CreateConcertPage } from './concerts/create-concert-page/create-concert-page';
import { Login } from './auth/login/login';
import { authGuard } from './auth/auth-guard';
import { Register } from './auth/register/register';
import { ConcertDetailsPage } from './concerts/concert-details-page/concert-details-page';
import { HomeContent } from './home/home-content/home-content';
import { UserPage } from './users/user-page/user-page';
import { CreateVenuePage } from './venues/create-venue-page/create-venue-page';

export const routes: Routes = [
  { path: '', component: HomeContent },
  { path: 'artists', component: ArtistsPage },
  { path: 'artists/:id', component: ArtistPage },
  { path: 'venues', component: VenuesPage },
  { path: 'venues/new', component: CreateVenuePage, canActivate: [authGuard] },
  { path: 'venues/:id', component: VenuePage },
  { path: 'concerts', component: ConcertsPage },
  { path: 'concerts/new', component: CreateConcertPage, canActivate: [authGuard] },
  { path: 'concerts/:id', component: ConcertDetailsPage },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'user/:username', component: UserPage },
];
