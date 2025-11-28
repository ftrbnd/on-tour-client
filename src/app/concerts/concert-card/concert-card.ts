import { Component, inject, input } from '@angular/core';
import { ConcertData } from '../concert-data';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { Message } from 'primeng/message';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-concert-card',
  imports: [CardModule, ButtonModule, RouterLink, Message, AvatarModule],
  templateUrl: './concert-card.html',
})
export class ConcertCard {
  concert = input<ConcertData>();
  isAuthenticated = inject(AuthService).isAuthenticated();
  showActionButtons = input<boolean>(true);
}
