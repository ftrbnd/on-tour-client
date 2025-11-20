import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-home-content',
  imports: [AsyncPipe, RouterLink, Button],
  templateUrl: './home-content.html',
})
export class HomeContent {
  authService = inject(AuthService);
}
