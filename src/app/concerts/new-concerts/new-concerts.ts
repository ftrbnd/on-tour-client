import { Component, inject, OnInit, signal } from '@angular/core';
import { ConcertsService } from '../concerts-service';
import { ConcertData } from '../concert-data';
import { ConcertCard } from '../concert-card/concert-card';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-new-concerts',
  imports: [ConcertCard, CarouselModule, TagModule, ButtonModule],
  templateUrl: './new-concerts.html',
})
export class NewConcerts implements OnInit {
  concertsService = inject(ConcertsService);
  latestConcerts = signal<ConcertData[]>([]);

  responsiveOptions: CarouselResponsiveOptions[] = [
    {
      breakpoint: '1280px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '640px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  ngOnInit(): void {
    this.concertsService.getLatestConcerts().subscribe((res) => this.latestConcerts.set(res));
  }
}
