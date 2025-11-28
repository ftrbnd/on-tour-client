import { Component, inject, input } from '@angular/core';
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

@Component({
  selector: 'app-concert-log',
  imports: [CardModule, RatingModule, FormsModule, DatePipe, RouterLink, Button, MenuModule],
  templateUrl: './concert-log.html',
})
export class ConcertLog {
  authService = inject(AuthService);

  concertLog = input.required<ConcertLogData>();
  concert = input<ConcertData>();
  onUsersProfilePage = input<boolean>(false);

  items: MenuItem[] = [
    {
      label: 'Options',
      items: [
        {
          label: 'Edit',
          icon: 'pi pi-pencil',
        },
      ],
    },
  ];
}
