import { Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { CommentData } from '../comments/comment-data';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection?: signalR.HubConnection;
  isConnected = signal(false);
  joinedGroup = signal(false);

  commentAdded = new Subject<CommentData>();

  async startConnection() {
    if (this.isConnected()) return;

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/api/comments/hub`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    try {
      await this.hubConnection.start();
      console.log('SignalR connection started');

      this.isConnected.set(true);
      this.setupListeners();
    } catch (err) {
      console.error('Error starting SignalR connection:', err);
      this.isConnected.set(false);
    }
  }

  private setupListeners() {
    this.hubConnection?.on('ReceiveComment', (comment: CommentData) => {
      this.commentAdded.next(comment);
    });

    this.hubConnection?.onreconnected(() => {
      console.log('SignalR reconnected');
      this.isConnected.set(true);
    });

    this.hubConnection?.onreconnecting(() => {
      console.log('SignalR reconnecting...');
      this.isConnected.set(false);
    });

    this.hubConnection?.onclose(() => {
      console.log('SignalR connection closed');
      this.isConnected.set(false);
    });
  }

  async joinConcertLogGroup(concertLogId: number) {
    if (!this.hubConnection) {
      await this.startConnection();
    }

    try {
      await this.hubConnection?.invoke('JoinConcertLogGroup', concertLogId);
      console.log(`Joined concert log group: ${concertLogId}`);
      this.joinedGroup.set(true);
    } catch (err) {
      console.error('Error joining group:', err);
      this.joinedGroup.set(false);
    }
  }

  async leaveConcertLogGroup(concertLogId: number): Promise<void> {
    try {
      await this.hubConnection?.invoke('LeaveConcertLogGroup', concertLogId);
      console.log(`Left concert log group: ${concertLogId}`);
      this.joinedGroup.set(false);
    } catch (err) {
      console.error('Error leaving group:', err);
      this.joinedGroup.set(true);
    }
  }

  stopConnection() {
    this.hubConnection?.stop();
    this.isConnected.set(false);
    this.joinedGroup.set(false);
  }
}
