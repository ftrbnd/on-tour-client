import { Component, computed, input } from '@angular/core';
import { ConcertLogData } from '../concert-log-data';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ConcertData } from '../../concerts/concert-data';

@Component({
  selector: 'app-concert-log',
  imports: [CardModule, RatingModule, FormsModule],
  templateUrl: './concert-log.html',
})
export class ConcertLog {
  concertLog = input.required<ConcertLogData>();
  concert = input<ConcertData>();
}
