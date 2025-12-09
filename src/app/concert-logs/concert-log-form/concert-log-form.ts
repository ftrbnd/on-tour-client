import { Component, effect, inject, input, model } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { ConcertData } from '../../concerts/concert-data';
import { Rating } from 'primeng/rating';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConcertLogsService } from '../concert-logs-service';
import {
  ConcertLogData,
  concertLogFormSchema,
  ConcertLogFormValues,
  updateConcertLogFormSchema,
  UpdateConcertLogFormValues,
} from '../concert-log-data';
import { InputGroup } from 'primeng/inputgroup';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TextareaModule } from 'primeng/textarea';
import { Message } from 'primeng/message';

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
    Message,
  ],
  templateUrl: './concert-log-form.html',
})
export class ConcertLogForm {
  concert = input<ConcertData>();
  visible = model.required<boolean>();
  previousConcertLog = input<ConcertLogData>();

  concertLogsService = inject(ConcertLogsService);

  constructor() {
    effect(() => {
      const log = this.previousConcertLog();
      if (log) {
        this.concertLogForm.patchValue({
          review: log.review,
          rating: log.rating,
          liked: log.liked,
        });
      }
    });
  }

  concertLogForm = new FormGroup({
    review: new FormControl(this.previousConcertLog()?.review ?? '', [Validators.maxLength(300)]),
    rating: new FormControl(this.previousConcertLog()?.rating ?? 1, [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
    liked: new FormControl(this.previousConcertLog()?.liked ?? false, [Validators.required]),
  });

  submit() {
    const prevLog = this.previousConcertLog();
    if (prevLog) {
      const validConcertLog = updateConcertLogFormSchema.parse({
        ...this.concertLogForm.value,
        id: prevLog.id,
      });
      this.submitUpdatedConcertLog(validConcertLog);
    } else {
      const validConcertLog = concertLogFormSchema.parse({
        ...this.concertLogForm.value,
        concertId: this.concert()?.id,
      });
      this.submitNewConcertLog(validConcertLog);
    }
  }

  submitNewConcertLog(concertLog: ConcertLogFormValues) {
    this.concertLogsService.createConcertLog(concertLog).subscribe({
      error: (err) => console.error(err),
      next: () => {
        this.visible.set(false);
        window.location.reload();
      },
    });
  }

  submitUpdatedConcertLog(concertLog: UpdateConcertLogFormValues) {
    this.concertLogsService.updateConcertLog(concertLog).subscribe({
      error: (err) => console.error(err),
      next: () => {
        this.visible.set(false);
        window.location.reload();
      },
    });
  }
}
