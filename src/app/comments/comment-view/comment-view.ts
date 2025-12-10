import { Component, input } from '@angular/core';
import { CommentData } from '../comment-data';
import { CardModule } from 'primeng/card';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment-view',
  imports: [CardModule, DatePipe],
  templateUrl: './comment-view.html',
})
export class CommentView {
  comment = input.required<CommentData>();
}
