import { Component, inject, input, model } from '@angular/core';
import { ConcertLogsService } from '../concert-logs-service';
import { ConcertLogData } from '../concert-log-data';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-delete-log',
  imports: [Dialog, ButtonModule],
  templateUrl: './confirm-delete-log.html',
})
export class ConfirmDeleteLog {
  concertLogsService = inject(ConcertLogsService);
  router = inject(Router);

  concertLog = input.required<ConcertLogData>();
  visible = model.required<boolean>();

  handleDelete() {
    this.concertLogsService.deleteConcertLog(this.concertLog().id).subscribe({
      error: (err) => console.error(err),
      next: () => {
        if (this.router.url.includes('/logs')) {
          this.router.navigateByUrl(`/concerts/${this.concertLog().concertId}`);
        } else {
          window.location.reload();
        }
      },
    });
  }
}
