import { Component, inject, OnInit, signal } from '@angular/core';
import { ArtistData } from '../artist-card/artist-data';
import { ArtistsService } from '../artists-service';

@Component({
  selector: 'app-artists-page',
  imports: [],
  templateUrl: './artists-page.html',
  styleUrl: './artists-page.css',
})
export class ArtistsPage implements OnInit {
  private artistsService = inject(ArtistsService);

  artists = signal<ArtistData[]>([]);

  ngOnInit(): void {
    this.artistsService.getArtists().subscribe((res) => this.artists.set(res));
  }
}
