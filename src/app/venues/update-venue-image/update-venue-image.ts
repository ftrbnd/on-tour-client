import { Component, inject, input, model, signal } from '@angular/core';
import { imageUrlValidator, VenueData } from '../venue-data';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { VenuesService } from '../venues-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-venue-image',
  imports: [
    ButtonModule,
    Dialog,
    ReactiveFormsModule,
    FloatLabelModule,
    InputGroupModule,
    InputTextModule,
    InputGroupAddonModule,
    MessageModule,
  ],
  templateUrl: './update-venue-image.html',
})
export class UpdateVenueImage {
  private venuesService = inject(VenuesService);

  venue = model.required<VenueData>();
  dialogVisible = signal(false);

  imageForm = new FormGroup({
    url: new FormControl('', [imageUrlValidator()]),
  });

  onSubmit() {
    this.venuesService
      .updateVenue(this.venue(), {
        imageUrl: this.imageForm.controls['url'].value,
      })
      .subscribe({
        error: (err) => console.error(err),
        next: (data) => {
          this.venue.set(data);
          /**
           * this.venue.set(data) does not update the signal, so we're doing a full page reload
           * possibly related to the original source being converted from an Observable using toSignal()
           */
          window.location.reload();
        },
      });
  }
}
