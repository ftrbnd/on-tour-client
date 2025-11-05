import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable, OnInit } from '@angular/core';
import { ArtistData } from '../artist/artist-data';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ArtistsService } from '../artists-service';

@Component({
  selector: 'app-artists-page',
  imports: [],
  templateUrl: './artists-page.html',
  styleUrl: './artists-page.css',
})
export class ArtistsPage implements OnInit {
  private artistsService = inject(ArtistsService);
  artists: ArtistData[] = [];

  ngOnInit(): void {
    this.artistsService.getArtists().subscribe((res) => {
      this.artists = res;
    });
  }
}
