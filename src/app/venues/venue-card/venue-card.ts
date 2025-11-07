import { Component, input } from '@angular/core';
import { VenueData } from '../venue-data';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-venue-card',
  imports: [CardModule, ButtonModule, RouterLink],
  templateUrl: './venue-card.html',
})
export class VenueCard {
  venue = input<VenueData>();
}
