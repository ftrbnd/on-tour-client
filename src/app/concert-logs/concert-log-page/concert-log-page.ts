import { Component, computed, effect, inject, OnDestroy, signal } from '@angular/core';
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
import { CardModule } from 'primeng/card';
import { SignalRService } from '../../comments/signalr-service';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-concert-log-page',
  imports: [
    ConcertLog,
    CommentView,
    InputTextModule,
    CommentInput,
    MessageModule,
    CardModule,
    ButtonModule,
    TooltipModule,
  ],
  templateUrl: './concert-log-page.html',
})
export class ConcertLogPage implements OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private concertLogsService = inject(ConcertLogsService);
  private commentsService = inject(CommentsService);
  signalRService = inject(SignalRService);

  successfullyJoinedGroup = computed(() => {
    return this.signalRService.isConnected() && this.signalRService.joinedGroup();
  });

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
    this.signalRService.startConnection();

    this.signalRService.commentAdded.subscribe((comment) => {
      if (comment.concertLogId === this.concertLog()?.id) {
        this.comments.update((comments) => [comment, ...comments]);
      }
    });

    effect(() => {
      const log = this.concertLog();
      if (!log) return;

      this.signalRService.joinConcertLogGroup(log.id);

      this.commentsService.getComments(log.id).subscribe((res) => {
        this.comments.set(res);
      });
    });
  }

  ngOnDestroy() {
    const logId = this.concertLog()?.id;
    if (logId) this.signalRService.leaveConcertLogGroup(logId);
  }
}
