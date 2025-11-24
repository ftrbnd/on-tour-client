import { Component, inject, input, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { ConcertData } from '../../concerts/concert-data';
import { Rating } from 'primeng/rating';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConcertLogsService } from '../concert-logs-service';
import { concertLogSchema } from '../concert-log-data';
import { InputGroup } from 'primeng/inputgroup';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-concert-log-form',
  imports: [
    ButtonModule,
    Dialog,
    Rating,
    ReactiveFormsModule,
    InputGroup,
    FloatLabelModule,
    CheckboxModule,
  ],
  templateUrl: './concert-log-form.html',
})
export class ConcertLogForm {
  concert = input<ConcertData>();
  visible = signal(false);

  concertLogsService = inject(ConcertLogsService);

  concertLogForm = new FormGroup({
    review: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    rating: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(5)]),
    liked: new FormControl(false, [Validators.required]),
  });

  showDialog() {
    this.visible.set(true);
  }

  hideDialog() {
    this.visible.set(false);
  }

  submitConcertLog() {
    const { data: validConcertLog, error } = concertLogSchema.safeParse(this.concertLogForm.value);

    if (error) {
      console.error(error);
    } else {
      this.concertLogsService.createConcertLog(validConcertLog).subscribe({
        error: (err) => console.error(err),
        next: () => this.hideDialog(),
      });
    }
  }
}
