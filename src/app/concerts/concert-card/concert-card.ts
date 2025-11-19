import { Component, input } from '@angular/core';
import { ConcertData } from '../concert-data';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { Message } from 'primeng/message';
import { AvatarModule } from 'primeng/avatar';
import { ConcertActionButtons } from '../shared/concert-action-buttons/concert-action-buttons';

@Component({
  selector: 'app-concert-card',
  imports: [CardModule, ButtonModule, RouterLink, Message, AvatarModule, ConcertActionButtons],
  templateUrl: './concert-card.html',
})
export class ConcertCard {
  concert = input<ConcertData>();
}
