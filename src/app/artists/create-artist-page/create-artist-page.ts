import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ArtistSearchResult } from '../artist-data';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ArtistsService } from '../artists-service';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-create-artist-page',
  imports: [ReactiveFormsModule, InputTextModule, FloatLabelModule, CardModule, MessageModule],
  templateUrl: './create-artist-page.html',
})
export class CreateArtistPage implements OnInit {
  private artistsService = inject(ArtistsService);

  searchForm = new FormGroup({
    query: new FormControl('', [Validators.required]),
  });
  results = signal<ArtistSearchResult[]>([]);

  ngOnInit() {
    this.searchForm.controls.query.valueChanges
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe(() => this.submitSearch());
  }

  submitSearch() {
    const query = this.searchForm.controls.query.value?.trim();
    if (!query || query == '')
      return this.searchForm.setErrors({
        required: true,
      });

    this.artistsService.searchArtists(query).subscribe({
      next: (res) => this.results.set(res),
      error: (err) => console.error(err),
    });
  }
}
