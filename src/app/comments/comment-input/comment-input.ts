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
    text: new FormControl('', [Validators.required, Validators.maxLength(300)]),
  });

  error = signal<string | null>(null);

  submitComment() {
    const { data, error } = commentFormSchema.safeParse({
      text: this.commentForm.controls.text.value,
      concertLogId: this.concertLog().id,
    });

    if (error) {
      console.error(error);
    } else {
      this.commentsService.addComment(data).subscribe({
        error: (err) => this.error.set(err.message),
        next: () => window.location.reload(),
      });
    }
  }
}
