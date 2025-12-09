import { Component, inject, input, model } from '@angular/core';
import { ConcertLogsService } from '../concert-logs-service';
import { ConcertLogData } from '../concert-log-data';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-confirm-delete-log',
  imports: [Dialog, ButtonModule],
  templateUrl: './confirm-delete-log.html',
})
export class ConfirmDeleteLog {
  concertLogsService = inject(ConcertLogsService);

  concertLog = input.required<ConcertLogData>();
  visible = model.required<boolean>();

  handleDelete() {
    this.concertLogsService.deleteConcertLog(this.concertLog().id).subscribe({
      error: (err) => console.error(err),
      next: () => window.location.reload(),
    });
  }
}
