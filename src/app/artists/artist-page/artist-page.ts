import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistsService } from '../artists-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';
import { ConcertPreview } from '../../concerts/concert-preview/concert-preview';

@Component({
  selector: 'app-artist-page',
  imports: [ConcertPreview],
  templateUrl: './artist-page.html',
})
export class ArtistPage {
  private activatedRoute = inject(ActivatedRoute);
  private artistsService = inject(ArtistsService);

  artist = toSignal(
    this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id')!;
        return this.artistsService.getArtist(id);
      })
    )
  );
}
