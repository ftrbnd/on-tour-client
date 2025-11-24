import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ConcertLogData } from './concert-log-data';
import { ConcertFormValues } from '../concerts/concert-data';

@Injectable({
  providedIn: 'root',
})
export class ConcertLogService {
  private http = inject(HttpClient);
  private endpoint = `${environment.apiUrl}/api/concertlogs`;

  getConcertLogs(): Observable<ConcertLogData[]> {
    return this.http.get<ConcertLogData[]>(this.endpoint);
  }

  getConcertLog(id: string): Observable<ConcertLogData> {
    return this.http.get<ConcertLogData>(`${this.endpoint}/${id}`);
  }

  createConcertLog(data: ConcertFormValues): Observable<ConcertLogData> {
    return this.http.post<ConcertLogData>(this.endpoint, data);
  }
}
