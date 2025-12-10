import { Component, effect, inject, signal } from '@angular/core';
import { ConcertLogsService } from '../concert-logs-service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { ConcertLog } from '../concert-log/concert-log';
import { CommentData } from '../../comments/comment-data';
import { CommentsService } from '../../comments/comments-service';
import { CommentView } from '../../comments/comment-view/comment-view';
import { InputTextModule } from 'primeng/inputtext';
import { CommentInput } from '../../comments/comment-input/comment-input';
import { MessageModule } from 'primeng/message';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-concert-log-page',
  imports: [ConcertLog, CommentView, InputTextModule, CommentInput, MessageModule, Card],
  templateUrl: './concert-log-page.html',
})
export class ConcertLogPage {
  private activatedRoute = inject(ActivatedRoute);
  private concertLogsService = inject(ConcertLogsService);
  private commentsService = inject(CommentsService);

  concertLog = toSignal(
    this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id')!;
        return this.concertLogsService.getConcertLog(id);
      })
    )
  );

  comments = signal<CommentData[]>([]);

  constructor() {
    effect(() => {
      const log = this.concertLog();
      if (!log) return;

      this.commentsService.getComments(log.id).subscribe((res) => {
        this.comments.set(res);
      });
    });
  }
}
