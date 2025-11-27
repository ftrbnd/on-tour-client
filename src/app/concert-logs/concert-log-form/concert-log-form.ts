import { Component, inject, input, model, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { ConcertData } from '../../concerts/concert-data';
import { Rating } from 'primeng/rating';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConcertLogsService } from '../concert-logs-service';
import { concertLogFormSchema } from '../concert-log-data';
import { InputGroup } from 'primeng/inputgroup';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TextareaModule } from 'primeng/textarea';

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
    ToggleButtonModule,
    TextareaModule,
  ],
  templateUrl: './concert-log-form.html',
})
export class ConcertLogForm {
  concert = input.required<ConcertData>();
  visible = model.required<boolean>();
  concertLogsService = inject(ConcertLogsService);

  concertLogForm = new FormGroup({
    review: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    rating: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(5)]),
    liked: new FormControl(false, [Validators.required]),
  });

  submitConcertLog() {
    const { data: validConcertLog, error } = concertLogFormSchema.safeParse({
      ...this.concertLogForm.value,
      concertId: this.concert()?.id,
    });

    if (error) {
      console.error(error);
    } else {
      this.concertLogsService.createConcertLog(validConcertLog).subscribe({
        error: (err) => console.error(err),
        next: () => this.visible.set(false),
      });
    }
  }
}
