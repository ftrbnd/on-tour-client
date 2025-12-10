import { Component, inject, OnInit, signal } from '@angular/core';
import { ArtistsService } from '../artists-service';
import { ArtistData } from '../artist-data';
import { CarouselModule } from 'primeng/carousel';
import { carouselResponsiveOptions } from '../../home/carousel-options';
import { ArtistCard } from '../artist-card/artist-card';
import { ErrorMessage } from '../../errors/error-message/error-message';

@Component({
  selector: 'app-popular-artists',
  imports: [CarouselModule, ArtistCard, ErrorMessage],
  templateUrl: './popular-artists.html',
})
export class PopularArtists implements OnInit {
  artistsService = inject(ArtistsService);
  popularArtists = signal<ArtistData[]>([]);
  responsiveOptions = carouselResponsiveOptions;

  error = signal<string | null>(null);

  ngOnInit(): void {
    this.artistsService.getPopularArtists().subscribe({
      error: (err) => this.error.set(err.message),
      next: (res) => this.popularArtists.set(res),
    });
  }
}
