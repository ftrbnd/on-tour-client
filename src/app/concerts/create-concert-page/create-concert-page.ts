import { Component } from '@angular/core';
import { NewConcertForm } from '../new-concert-form/new-concert-form';

@Component({
  selector: 'app-create-concert-page',
  imports: [NewConcertForm],
  templateUrl: './create-concert-page.html',
})
export class CreateConcertPage {}
