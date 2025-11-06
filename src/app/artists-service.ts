import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { ArtistData } from './artist-card/artist-data';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  private http = inject(HttpClient);

  getArtists(): Observable<ArtistData[]> {
    return this.http.get<ArtistData[]>(`${environment.apiUrl}/api/artists`);
  }

  getArtist(id: string): Observable<ArtistData> {
    return this.http.get<ArtistData>(`${environment.apiUrl}/api/artists/${id}`);
  }
}
