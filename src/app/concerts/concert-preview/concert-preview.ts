import { Component, computed, input } from '@angular/core';
import { ConcertData } from '../concert-data';
import { DatePipe } from '@angular/common';
import { VenueData } from '../../venues/venue-data';
import { RouterLink } from '@angular/router';
import { ArtistData } from '../../artists/artist-data';

@Component({
  selector: 'app-concert-preview',
  imports: [DatePipe, RouterLink],
  templateUrl: './concert-preview.html',
})
export class ConcertPreview {
  concert = input<ConcertData>();
  venue = input<VenueData | null>();
  artist = input<ArtistData | null>();

  currentPage = computed(() => (this.venue() !== undefined ? 'venue' : 'artist'));
}
