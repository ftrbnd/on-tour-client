import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user-page',
  imports: [ButtonModule],
  templateUrl: './user-page.html',
})
export class UserPage {
  authService = inject(AuthService);
}
