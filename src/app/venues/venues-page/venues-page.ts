import { Component, inject, OnInit, signal } from '@angular/core';
import { VenuesService } from '../venues-service';
import { VenueData } from '../venue-data';
import { VenueCard } from '../venue-card/venue-card';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-venues-page',
  imports: [VenueCard, Message],
  templateUrl: './venues-page.html',
})
export class VenuesPage implements OnInit {
  private venuesService = inject(VenuesService);

  venues = signal<VenueData[]>([]);

  ngOnInit(): void {
    this.venuesService.getVenues().subscribe((res) => {
      console.log(res);
      this.venues.set(res);
    });
  }
}
