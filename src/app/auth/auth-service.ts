import { computed, inject, Injectable, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.development';
import { AuthStatus, LoginRequest, LoginResult, TOKEN_KEY } from './auth-options';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private http = inject(HttpClient);

  authStatus = signal<AuthStatus | null>(null);
  isAuthenticated = computed(() => this.authStatus() !== null);

  ngOnInit(): void {
    // fetch user details from backend with token
    // token is fetched in interceptor
    this.getUser().subscribe({
      next: (res) => {
        console.log(res);
        this.authStatus.set(res);
      },
    });
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
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
