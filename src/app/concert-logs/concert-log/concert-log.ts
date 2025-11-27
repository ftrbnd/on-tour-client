import { Component, input } from '@angular/core';
import { ConcertLogData } from '../concert-log-data';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ConcertData } from '../../concerts/concert-data';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-concert-log',
  imports: [CardModule, RatingModule, FormsModule, DatePipe, RouterLink],
  templateUrl: './concert-log.html',
})
export class ConcertLog {
  concertLog = input.required<ConcertLogData>();
  concert = input<ConcertData>();
}
