import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Navbar } from './navbar/navbar';
import { AuthService } from './auth/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, Navbar],
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('On Tour');
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.init();
  }
}
