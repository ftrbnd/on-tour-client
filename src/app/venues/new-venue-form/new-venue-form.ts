import { Component, inject } from '@angular/core';
import { VenuesService } from '../venues-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { venueFormSchema } from '../venue-data';
import { Router } from '@angular/router';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-new-venue-form',
  imports: [
    ReactiveFormsModule,
    InputGroupModule,
    InputTextModule,
    InputGroupAddonModule,
    FloatLabelModule,
    ButtonModule,
  ],
  templateUrl: './new-venue-form.html',
})
export class NewVenueForm {
  private venuesService = inject(VenuesService);
  private router = inject(Router);

  venueForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    imageUrl: new FormControl(),
  });

  onSubmit() {
    const { data: validVenue, error } = venueFormSchema.safeParse(this.venueForm.value);

    if (error) {
      console.error(error);
    } else {
      this.venuesService.createVenue(validVenue).subscribe({
        error: (err) => console.error(err),
        next: (data) => this.router.navigateByUrl(`/venues/${data.id}`),
      });
    }
  }
}
