import { Component, computed, inject } from '@angular/core';
import { ConcertsService } from '../concerts-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ConcertActionButtons } from '../shared/concert-action-buttons/concert-action-buttons';

@Component({
  selector: 'app-concert-details-page',
  imports: [DatePipe, ConcertActionButtons],
  templateUrl: './concert-details-page.html',
})
export class ConcertDetailsPage {
  private concertsService = inject(ConcertsService);
  private activatedRoute = inject(ActivatedRoute);

  concert = toSignal(
    this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id')!;
        return this.concertsService.getConcert(id);
      })
    )
  );

  concertDate = computed(() => new Date(this.concert()?.date ?? new Date().getTime()));
}
