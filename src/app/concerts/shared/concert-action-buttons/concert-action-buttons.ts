import { Component, input } from '@angular/core';
import { ConcertData } from '../../concert-data';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-concert-action-buttons',
  imports: [ButtonModule],
  templateUrl: './concert-action-buttons.html',
})
export class ConcertActionButtons {
  concert = input<ConcertData>();
}
