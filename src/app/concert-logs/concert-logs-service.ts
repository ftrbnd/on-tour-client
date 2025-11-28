import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import {
  ConcertLogData,
  ConcertLogFormValues,
  UpdateConcertLogFormValues,
} from './concert-log-data';

@Injectable({
  providedIn: 'root',
})
export class ConcertLogsService {
  private http = inject(HttpClient);
  private endpoint = `${environment.apiUrl}/api/concertlogs`;

  getConcertLogs(): Observable<ConcertLogData[]> {
    return this.http.get<ConcertLogData[]>(this.endpoint);
  }

  getConcertLog(id: string): Observable<ConcertLogData> {
    return this.http.get<ConcertLogData>(`${this.endpoint}/${id}`);
  }

  createConcertLog(data: ConcertLogFormValues): Observable<ConcertLogData> {
    return this.http.post<ConcertLogData>(this.endpoint, data);
  }

  updateConcertLog(data: UpdateConcertLogFormValues) {
    return this.http.put<void>(`${this.endpoint}/${data.id}`, data);
  }

  getWeeklyConcertLogs(): Observable<ConcertLogData[]> {
    return this.http.get<ConcertLogData[]>(`${this.endpoint}?sort=weekly`);
  }
}
