import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToastComponent } from './toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: { class: 'app' },
})
export class App {}

