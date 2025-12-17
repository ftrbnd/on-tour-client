import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ConcertData, ConcertFormValues } from './concert-data';

@Injectable({
  providedIn: 'root',
})
export class ConcertsService {
  private http = inject(HttpClient);
  private endpoint = `${environment.apiUrl}/api/concerts`;

  getConcerts(): Observable<ConcertData[]> {
    return this.http.get<ConcertData[]>(this.endpoint);
  }

  getConcert(id: string): Observable<ConcertData> {
    return this.http.get<ConcertData>(`${this.endpoint}/${id}`);
  }

  createConcert(data: ConcertFormValues): Observable<ConcertData> {
    return this.http.post<ConcertData>(this.endpoint, data);
  }

  getLatestConcerts() {
    return this.http.get<ConcertData[]>(`${this.endpoint}?sort=latest`);
  }
}
