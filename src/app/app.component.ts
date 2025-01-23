import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  standalone : true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host: { class: 'app-root' },
})
export class AppComponent {
  title = 'xtramile_crud';
}
