import { Component, inject, OnInit, signal } from '@angular/core';
import { ConcertsService } from '../concerts-service';
import { ConcertData } from '../concert-data';
import { ConcertCard } from '../concert-card/concert-card';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { carouselResponsiveOptions } from '../../home/carousel-options';
import { ErrorMessage } from '../../errors/error-message/error-message';

@Component({
  selector: 'app-new-concerts',
  imports: [ConcertCard, CarouselModule, TagModule, ButtonModule, ErrorMessage],
  templateUrl: './new-concerts.html',
})
export class NewConcerts implements OnInit {
  concertsService = inject(ConcertsService);
  latestConcerts = signal<ConcertData[]>([]);
  responsiveOptions = carouselResponsiveOptions;

  error = signal<string | null>(null);

  ngOnInit(): void {
    this.concertsService.getLatestConcerts().subscribe({
      error: (err) => this.error.set(err.message),
      next: (res) => this.latestConcerts.set(res),
    });
  }
}
