import { Component, inject, input, signal } from '@angular/core';
import { ConcertLogData } from '../concert-log-data';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ConcertData } from '../../concerts/concert-data';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../auth/auth-service';
import { ConcertLogForm } from '../concert-log-form/concert-log-form';
import { BadgeModule } from 'primeng/badge';
import { ConfirmDeleteLog } from '../confirm-delete-log/confirm-delete-log';

@Component({
  selector: 'app-concert-log',
  imports: [
    CardModule,
    RatingModule,
    FormsModule,
    DatePipe,
    RouterLink,
    Button,
    MenuModule,
    ConcertLogForm,
    BadgeModule,
    ConfirmDeleteLog,
  ],
  templateUrl: './concert-log.html',
})
export class ConcertLog {
  authService = inject(AuthService);

  concertLog = input.required<ConcertLogData>();
  concert = input<ConcertData>();
  onUsersProfilePage = input<boolean>(false);
  showMenu = input<boolean>(true);
  isFullPage = input<boolean>(false);

  showEdit = signal(false);
  showDelete = signal(false);

  items: MenuItem[] = [
    {
      label: 'Options',
      items: [
        {
          label: 'Edit',
          icon: 'pi pi-pencil',
          command: () => this.showEdit.set(true),
        },
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: () => this.showDelete.set(true),
        },
      ],
    },
  ];
}
