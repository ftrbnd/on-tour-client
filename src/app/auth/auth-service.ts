import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.development';
import { LoginRequest, LoginResult, TOKEN_KEY } from './auth-options';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  isAuthenticated() {
    return this.getToken() !== null;
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  login(request: LoginRequest): Observable<LoginResult> {
    return this.http.post<LoginResult>(`${environment.apiUrl}/api/account/login`, request);
  }
}
