import { Component, computed, input } from '@angular/core';
import { CommentData } from '../comment-data';
import { CardModule } from 'primeng/card';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-comment-view',
  imports: [CardModule, DatePipe, RouterLink],
  templateUrl: './comment-view.html',
})
export class CommentView {
  comment = input.required<CommentData>();

  isToday = computed(() => {
    const today = new Date().toDateString();
    const commentDay = new Date(this.comment().date).toDateString();

    return today === commentDay;
  });
}
