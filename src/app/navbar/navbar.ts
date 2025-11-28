import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [
    ToolbarModule,
    ButtonModule,
    RouterLink,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './navbar.html',
})
export class Navbar {
  authService = inject(AuthService);
}
