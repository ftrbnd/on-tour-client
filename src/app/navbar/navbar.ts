import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-navbar',
  imports: [
    ToolbarModule,
    ButtonModule,
    RouterLink,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './navbar.html',
})
export class Navbar {}
