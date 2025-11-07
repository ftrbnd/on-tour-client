import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VenueData } from './venue-data';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class VenuesService {
  private http = inject(HttpClient);

  getVenues(): Observable<VenueData[]> {
    return this.http.get<VenueData[]>(`${environment.apiUrl}/api/venues`);
  }

  getVenue(id: string): Observable<VenueData> {
    return this.http.get<VenueData>(`${environment.apiUrl}/api/venues/${id}`);
  }
}
