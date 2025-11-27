import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { UserData } from './user-data';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private endpoint = `${environment.apiUrl}/api/users`;

  getUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this.endpoint);
  }

  getUser(username: string): Observable<UserData> {
    return this.http.get<UserData>(`${this.endpoint}/${username}`);
  }
}
