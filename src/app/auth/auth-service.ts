import { computed, inject, Injectable, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.development';
import { AuthStatus, LoginRequest, LoginResult, TOKEN_KEY } from './auth-options';
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
        console.log(res);
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
    console.log({ token });
    return token;
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getUser() {
    return this.http.get<AuthStatus>(`${environment.apiUrl}/api/account/me`);
  }

  login(request: LoginRequest): Observable<LoginResult> {
    return this.http.post<LoginResult>(`${environment.apiUrl}/api/account/login`, request);
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.authStatus.set(null);
  }
}
