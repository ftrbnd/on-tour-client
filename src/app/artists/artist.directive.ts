import { inject, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { ArtistsService } from './artists-service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UniqueArtistValidator implements AsyncValidator {
  private readonly artistsService = inject(ArtistsService);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.artistsService.checkArtistExists(control.value).pipe(
      map((exists) => (exists ? { alreadyExists: true } : null)),
      catchError(() => of(null))
    );
  }
}
