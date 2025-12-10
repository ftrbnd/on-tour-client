import { Component, inject, OnInit, signal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { carouselResponsiveOptions } from '../../home/carousel-options';
import { ConcertLogsService } from '../concert-logs-service';
import { ConcertLogData } from '../concert-log-data';
import { ConcertLog } from '../concert-log/concert-log';
import { MessageModule } from 'primeng/message';
import { ErrorMessage } from '../../errors/error-message/error-message';

@Component({
  selector: 'app-weekly-logs',
  imports: [CarouselModule, ConcertLog, MessageModule, ErrorMessage],
  templateUrl: './weekly-logs.html',
})
export class WeeklyLogs implements OnInit {
  concertLogsService = inject(ConcertLogsService);
  weeklyLogs = signal<ConcertLogData[]>([]);
  responsiveOptions = carouselResponsiveOptions;

  error = signal<string | null>(null);

  ngOnInit(): void {
    this.concertLogsService.getWeeklyConcertLogs().subscribe({
      error: (err) => this.error.set(err.message),
      next: (res) => this.weeklyLogs.set(res),
    });
  }
}
