import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { NewConcerts } from '../../concerts/new-concerts/new-concerts';
import { PopularArtists } from '../../artists/popular-artists/popular-artists';
import { WeeklyLogs } from '../../concert-logs/weekly-logs/weekly-logs';

@Component({
  selector: 'app-home-content',
  imports: [RouterLink, Button, NewConcerts, PopularArtists, WeeklyLogs],
  templateUrl: './home-content.html',
})
export class HomeContent {
  authService = inject(AuthService);
  user = toSignal(this.authService.getUser());
}
