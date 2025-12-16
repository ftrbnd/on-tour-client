import { Component, effect, inject, input, signal } from '@angular/core';
import { ArtistSearchResult, artistSearchSchema } from '../artist-data';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ArtistsService } from '../artists-service';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { MessageModule } from 'primeng/message';
import { UniqueArtistValidator } from '../artist.directive';
import { ErrorMessage } from '../../errors/error-message/error-message';

@Component({
  selector: 'app-new-artist-form',
  imports: [CardModule, ButtonModule, ReactiveFormsModule, MessageModule, RouterLink, ErrorMessage],
  templateUrl: './new-artist-form.html',
})
export class NewArtistForm {
  private artistsService = inject(ArtistsService);
  uniqueArtistValidator = inject(UniqueArtistValidator);
  private router = inject(Router);

  artist = input.required<ArtistSearchResult>();
  error = signal<string | null>(null);

  artistForm = new FormGroup({
    spotifyId: new FormControl(
      '',
      [Validators.required],
      [this.uniqueArtistValidator.validate.bind(this.uniqueArtistValidator)]
    ),
    name: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
  });

  constructor() {
    effect(() => {
      this.artistForm.patchValue({
        spotifyId: this.artist().spotifyId,
        name: this.artist().name,
        imageUrl: this.artist().imageUrl,
        url: this.artist().url,
      });
    });
  }

  submitArtist() {
    const { data, error } = artistSearchSchema.safeParse(this.artistForm.value);

    if (error) {
      this.error.set(error.message);
    } else {
      this.artistsService.createArtist(data).subscribe({
        error: (err) => this.error.set(err.message),
        next: (artist) => this.router.navigateByUrl(`/artists/${artist.id}`),
      });
    }
  }

  artistAlreadyExists(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{
      [key: string]: any;
    } | null> => {
      return this.artistsService.checkArtistExists(control.value).pipe(
        map((result) => {
          return result ? { alreadyExists: true } : null;
        })
      );
    };
  }
}
