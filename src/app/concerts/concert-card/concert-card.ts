import { Component, input } from '@angular/core';
import { ConcertData } from '../concert-data';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-concert-card',
  imports: [CardModule, ButtonModule, RouterLink, Message],
  templateUrl: './concert-card.html',
})
export class ConcertCard {
  concert = input<ConcertData>();
}
