import { Component, input } from '@angular/core';
import { VenueData } from '../venue-data';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
  selector: 'app-venue-card',
  imports: [CardModule, ButtonModule, RouterLink, OverlayBadgeModule],
  templateUrl: './venue-card.html',
})
export class VenueCard {
  venue = input<VenueData>();
}
