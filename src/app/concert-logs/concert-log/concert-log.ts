import { Component, input } from '@angular/core';
import { ConcertLogData } from '../concert-log-data';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-concert-log',
  imports: [JsonPipe],
  templateUrl: './concert-log.html',
})
export class ConcertLog {
  concertLog = input<ConcertLogData>();
}
