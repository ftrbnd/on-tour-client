import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { VenuesService } from '../../venues/venues-service';
import { ArtistsService } from '../../artists/artists-service';
import { ArtistData } from '../../artists/artist-data';
import { VenueData } from '../../venues/venue-data';
import { concertFormSchema } from '../concert-data';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageModule } from 'primeng/message';
import { ConcertsService } from '../concerts-service';

@Component({
  selector: 'app-new-concert-form',
  imports: [
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    SelectModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    DatePickerModule,
    MessageModule,
  ],
  templateUrl: './new-concert-form.html',
})
export class NewConcertForm implements OnInit {
  private artistsService = inject(ArtistsService);
  private venuesService = inject(VenuesService);
  private concertsService = inject(ConcertsService);

  artists = signal<ArtistData[]>([]);
  venues = signal<VenueData[]>([]);

  concertForm = new FormGroup({
    artistId: new FormControl(-1, [Validators.required]),
    venueId: new FormControl(-1, [Validators.required]),
    tour: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    date: new FormControl(new Date(), [Validators.required]),
  });

  ngOnInit(): void {
    this.artistsService.getArtists().subscribe((res) => {
      this.artists.set(res);
    });
    this.venuesService.getVenues().subscribe((res) => {
      this.venues.set(res);
    });
  }

  isInvalid(controlName: string) {
    const control = this.concertForm.get(controlName);
    return control?.invalid && control.touched;
  }

  onSubmit() {
    const { data: validConcert, error } = concertFormSchema.safeParse(this.concertForm.value);

    if (error) {
      console.error(error);
    } else {
      this.concertsService.createConcert(validConcert).subscribe({
        error: (err) => console.error(err),
        next: (data) => console.log(data),
      });
    }
  }
}
