import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ArtistData, ArtistSearchResult } from './artist-data';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  private http = inject(HttpClient);
  private endpoint = `${environment.apiUrl}/api/artists`;

  getArtists(): Observable<ArtistData[]> {
    return this.http.get<ArtistData[]>(this.endpoint);
  }

  getArtist(id: string): Observable<ArtistData> {
    return this.http.get<ArtistData>(`${this.endpoint}/${id}`);
  }

  getPopularArtists(): Observable<ArtistData[]> {
    return this.http.get<ArtistData[]>(`${this.endpoint}?sort=popular`);
  }

  searchArtists(query: string) {
    return this.http.get<ArtistSearchResult[]>(`${this.endpoint}/search?query=${query}`);
  }
}
