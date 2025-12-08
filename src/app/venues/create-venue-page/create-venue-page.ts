import { Component } from '@angular/core';
import { NewVenueForm } from '../new-venue-form/new-venue-form';

@Component({
  selector: 'app-create-venue-page',
  imports: [NewVenueForm],
  templateUrl: './create-venue-page.html',
})
export class CreateVenuePage {}
