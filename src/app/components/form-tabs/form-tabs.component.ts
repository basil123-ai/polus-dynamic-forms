import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-form-tabs',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './form-tabs.component.html',
  styleUrl: './form-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormTabsComponent {}
