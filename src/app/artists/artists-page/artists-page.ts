import { Component, inject, OnInit, signal } from '@angular/core';
import { ArtistData } from '../artist-data';
import { ArtistsService } from '../artists-service';
import { ArtistCard } from '../artist-card/artist-card';
import { Message } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-artists-page',
  imports: [ArtistCard, Message, ButtonModule, RouterLink],
  templateUrl: './artists-page.html',
})
export class ArtistsPage implements OnInit {
  private artistsService = inject(ArtistsService);

  artists = signal<ArtistData[]>([]);

  ngOnInit(): void {
    this.artistsService.getArtists().subscribe((res) => this.artists.set(res));
  }
}
