import { Component, inject, OnInit, signal } from '@angular/core';
import { VenuesService } from '../venues-service';
import { VenueData } from '../venue-data';
import { VenueCard } from '../venue-card/venue-card';
import { Message } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-venues-page',
  imports: [VenueCard, Message, ButtonModule, RouterLink],
  templateUrl: './venues-page.html',
})
export class VenuesPage implements OnInit {
  private venuesService = inject(VenuesService);

  venues = signal<VenueData[]>([]);

  ngOnInit(): void {
    this.venuesService.getVenues().subscribe((res) => this.venues.set(res));
  }
}
