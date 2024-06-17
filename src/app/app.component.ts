import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="max-w-screen-md mx-auto">
      Testing this
    </div>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'blog testing again';
}
