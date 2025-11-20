import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { VenuesService } from '../../venues/venues-service';
import { ConcertPreview } from '../../concerts/concert-preview/concert-preview';

@Component({
  selector: 'app-venue-page',
  imports: [ConcertPreview],
  templateUrl: './venue-page.html',
})
export class VenuePage {
  private activatedRoute = inject(ActivatedRoute);
  private venuesService = inject(VenuesService);

  venue = toSignal(
    this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id')!;
        return this.venuesService.getVenue(id);
      })
    )
  );
}
