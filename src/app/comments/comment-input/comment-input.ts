import { Component, inject, input, signal } from '@angular/core';
import { ConcertLogData } from '../../concert-logs/concert-log-data';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../comments-service';
import { commentFormSchema } from '../comment-data';
import { MessageModule } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { ErrorMessage } from '../../errors/error-message/error-message';

@Component({
  selector: 'app-comment-input',
  imports: [ReactiveFormsModule, MessageModule, TextareaModule, ButtonModule, ErrorMessage],
  templateUrl: './comment-input.html',
})
export class CommentInput {
  private commentsService = inject(CommentsService);
  concertLog = input.required<ConcertLogData>();

  commentForm = new FormGroup({
    text: new FormControl(
      {
        value: '',
        disabled: false,
      },
      [Validators.required, Validators.maxLength(300)]
    ),
  });

  error = signal<string | null>(null);
  isSubmitting = signal<boolean>(false);

  submitComment() {
    const { data, error } = commentFormSchema.safeParse({
      text: this.commentForm.controls.text.value,
      concertLogId: this.concertLog().id,
    });

    if (error) {
      console.error(error);
      this.setFormStatus(false, error.message);
    } else {
      this.setFormStatus(true);

      this.commentsService.addComment(data).subscribe({
        error: (err) => {
          this.setFormStatus(false, err.message);
        },
        next: () => {
          this.commentForm.reset();
          this.setFormStatus(false);
        },
      });
    }
  }

  setFormStatus(isSubmitting: boolean, error?: string | null) {
    this.isSubmitting.set(isSubmitting);
    if (isSubmitting) this.commentForm.controls.text.disable();
    else this.commentForm.controls.text.enable();

    if (error !== undefined) this.error.set(error);
  }
}
