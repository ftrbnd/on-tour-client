import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-content',
  imports: [RouterLink, Button],
  templateUrl: './home-content.html',
})
export class HomeContent {
  authService = inject(AuthService);
  user = toSignal(this.authService.getUser());
}
