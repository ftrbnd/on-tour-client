import { Component, inject } from '@angular/core';
import { ConcertLogsService } from '../concert-logs-service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { ConcertLog } from '../concert-log/concert-log';

@Component({
  selector: 'app-concert-log-page',
  imports: [ConcertLog],
  templateUrl: './concert-log-page.html',
})
export class ConcertLogPage {
  private activatedRoute = inject(ActivatedRoute);
  private concertLogsService = inject(ConcertLogsService);

  concertLog = toSignal(
    this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id')!;
        return this.concertLogsService.getConcertLog(id);
      })
    )
  );
}
