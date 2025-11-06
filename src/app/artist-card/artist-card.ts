import { Component, input } from '@angular/core';
import { ArtistData } from './artist-data';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-artist-card',
  imports: [CardModule, ButtonModule],
  templateUrl: './artist-card.html',
  styleUrl: './artist-card.css',
})
export class ArtistCard {
  artist = input<ArtistData>();
}
