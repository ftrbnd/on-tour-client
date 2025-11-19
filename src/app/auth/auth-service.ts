import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.development';
import { AuthStatus, AuthRequest, AuthResponse, TOKEN_KEY } from './auth-options';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  authStatus = signal<AuthStatus | null>(null);
  isAuthenticated = computed(() => this.authStatus() !== null);

  init() {
    this.getUser().subscribe({
      next: (res) => {
        this.authStatus.set(res);
      },
      error: (err) => {
        console.error(err);
        this.authStatus.set(null);
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
    return this.http.get<AuthStatus>(`${environment.apiUrl}/api/auth/me`);
  }

  register(request: AuthRequest) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/api/auth/register`, request);
  }

  login(request: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/api/auth/login`, request);
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.authStatus.set(null);
  }
}
