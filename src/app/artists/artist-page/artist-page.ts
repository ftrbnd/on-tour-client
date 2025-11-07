import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistsService } from '../artists-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-artist-page',
  imports: [],
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
