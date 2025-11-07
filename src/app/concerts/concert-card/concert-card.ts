import { Component, input } from '@angular/core';
import { ConcertData } from '../concert-data';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-concert-card',
  imports: [CardModule, ButtonModule, RouterLink],
  templateUrl: './concert-card.html',
})
export class ConcertCard {
  concert = input<ConcertData>();
}
