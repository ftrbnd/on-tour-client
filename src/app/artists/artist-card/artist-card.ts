import { Component, input } from '@angular/core';
import { ArtistData } from '../artist-data';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
  selector: 'app-artist-card',
  imports: [CardModule, ButtonModule, RouterLink, OverlayBadgeModule],
  templateUrl: './artist-card.html',
})
export class ArtistCard {
  artist = input<ArtistData>();
}
