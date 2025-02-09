import { Component, Injectable, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="max-w-screen-md mx-auto">
      <router-outlet></router-outlet>
    </div>
  `,
  // styleUrl: './app.component.css'
})
export class AppComponent {

}
