import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CommentData, CommentFormValues } from './comment-data';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private http = inject(HttpClient);
  private endpoint = `${environment.apiUrl}/api/comments`;

  addComment(comment: CommentFormValues) {
    return this.http.post<CommentData>(`${this.endpoint}`, comment);
  }

  getComments(concertLogId: number) {
    return this.http.get<CommentData[]>(`${this.endpoint}?concertLogId=${concertLogId}`);
  }
}
