import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
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
  ],
  templateUrl: './new-concert-form.html',
})
export class NewConcertForm {
  artists = [];
  venues = [];

  concertForm = new FormGroup({
    artist: new FormControl(''),
    venue: new FormControl(''),
    tour: new FormControl(''),
    date: new FormControl(),
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.concertForm.value);
  }
}
