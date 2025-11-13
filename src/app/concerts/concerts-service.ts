import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ConcertData, ConcertFormValues } from './concert-data';

@Injectable({
  providedIn: 'root',
})
export class ConcertsService {
  private http = inject(HttpClient);

  getConcerts(): Observable<ConcertData[]> {
    return this.http.get<ConcertData[]>(`${environment.apiUrl}/api/concerts`);
  }

  getConcert(id: string): Observable<ConcertData> {
    return this.http.get<ConcertData>(`${environment.apiUrl}/api/concerts/${id}`);
  }

  createConcert(data: ConcertFormValues): Observable<ConcertData> {
    return this.http.post<ConcertData>(`${environment.apiUrl}/api/concerts`, data);
  }
}
