import { Component, inject, OnInit, signal } from '@angular/core';
import { ArtistsService } from '../artists-service';
import { ArtistData } from '../artist-data';
import { CarouselModule } from 'primeng/carousel';
import { carouselResponsiveOptions } from '../../home/carousel-options';
import { ArtistCard } from '../artist-card/artist-card';

@Component({
  selector: 'app-popular-artists',
  imports: [CarouselModule, ArtistCard],
  templateUrl: './popular-artists.html',
})
export class PopularArtists implements OnInit {
  artistsService = inject(ArtistsService);
  popularArtists = signal<ArtistData[]>([]);
  responsiveOptions = carouselResponsiveOptions;

  ngOnInit(): void {
    this.artistsService.getPopularArtists().subscribe((res) => this.popularArtists.set(res));
  }
}
