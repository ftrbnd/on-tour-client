import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { ButtonModule } from 'primeng/button';
import { UsersService } from '../users-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConcertLog } from '../../concert-logs/concert-log/concert-log';

@Component({
  selector: 'app-user-page',
  imports: [ButtonModule, ConcertLog, RouterLink],
  templateUrl: './user-page.html',
})
export class UserPage {
  private activatedRoute = inject(ActivatedRoute);

  authService = inject(AuthService);
  usersService = inject(UsersService);

  user = toSignal(
    this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const username = params.get('username')!;
        return this.usersService.getUser(username);
      })
    )
  );

  isMyPage = computed(() => this.user()?.username === this.authService.authStatus()?.username);
}
