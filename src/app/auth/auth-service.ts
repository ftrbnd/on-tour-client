import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { AuthRequest, AuthResponse, TOKEN_KEY } from './auth-options';
import { Observable } from 'rxjs';
import { UserData } from '../users/user-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  authUser = signal<UserData | null>(null);
  isAuthenticated = computed(() => this.authUser() !== null);

  init() {
    this.getUser().subscribe({
      next: (res) => {
        this.authUser.set(res);
      },
      error: (err) => {
        console.error(err);
        this.authUser.set(null);
      },
    });
  }

  getToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    return token;
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
    this.init();
  }

  getUser() {
    return this.http.get<UserData>(`${environment.apiUrl}/api/auth/me`);
  }

  register(request: AuthRequest) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/api/auth/register`, request);
  }

  login(request: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/api/auth/login`, request);
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.authUser.set(null);
  }
}
