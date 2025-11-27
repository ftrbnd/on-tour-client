import { Component, inject, OnInit, signal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { carouselResponsiveOptions } from '../../home/carousel-options';
import { ConcertLogsService } from '../concert-logs-service';
import { ConcertLogData } from '../concert-log-data';
import { ConcertLog } from '../concert-log/concert-log';

@Component({
  selector: 'app-weekly-logs',
  imports: [CarouselModule, ConcertLog],
  templateUrl: './weekly-logs.html',
})
export class WeeklyLogs implements OnInit {
  concertLogsService = inject(ConcertLogsService);
  weeklyLogs = signal<ConcertLogData[]>([]);
  responsiveOptions = carouselResponsiveOptions;

  ngOnInit(): void {
    this.concertLogsService.getWeeklyConcertLogs().subscribe((res) => this.weeklyLogs.set(res));
  }
}
