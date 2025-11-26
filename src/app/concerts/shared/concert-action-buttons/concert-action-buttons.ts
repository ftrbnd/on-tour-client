import { Component, input, model, signal } from '@angular/core';
import { ConcertData } from '../../concert-data';
import { ButtonModule } from 'primeng/button';
import { ConcertLogForm } from '../../../concert-logs/concert-log-form/concert-log-form';

@Component({
  selector: 'app-concert-action-buttons',
  imports: [ButtonModule, ConcertLogForm],
  templateUrl: './concert-action-buttons.html',
})
export class ConcertActionButtons {
  concert = input.required<ConcertData>();
  dialogVisible = signal(false);
}
