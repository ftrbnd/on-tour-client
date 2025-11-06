import { Component, inject, OnInit, signal } from '@angular/core';
import { ArtistData } from '../artist-card/artist-data';
import { ArtistsService } from '../artists-service';
import { ArtistCard } from '../artist-card/artist-card';

@Component({
  selector: 'app-artists-page',
  imports: [ArtistCard],
  templateUrl: './artists-page.html',
  styleUrl: './artists-page.css',
})
export class ArtistsPage implements OnInit {
  private artistsService = inject(ArtistsService);

  artists = signal<ArtistData[]>([]);

  ngOnInit(): void {
    this.artistsService.getArtists().subscribe((res) => {
      console.log(res);
      this.artists.set(res);
    });
  }
}
