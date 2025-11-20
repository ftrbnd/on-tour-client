import { Component, inject, OnInit, signal } from '@angular/core';
import { ConcertData } from '../concert-data';
import { ConcertsService } from '../concerts-service';
import { ConcertCard } from '../concert-card/concert-card';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-concerts-page',
  imports: [ConcertCard, RouterLink, Button],
  templateUrl: './concerts-page.html',
})
export class ConcertsPage implements OnInit {
  private concertsService = inject(ConcertsService);

  concerts = signal<ConcertData[]>([]);

  ngOnInit(): void {
    this.concertsService.getConcerts().subscribe((res) => this.concerts.set(res));
  }
}
