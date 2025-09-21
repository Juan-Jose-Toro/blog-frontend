import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { Observable } from 'rxjs';
import secrets from '../../../secrets.json';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="markdown-body">
      <ul class="">
        @for(note of noteList; track note) {
          <li>
            <!-- Creates a link with the name of the note we just fetched -->
            <!-- See app.routes.ts for routes  -->
            <a [routerLink]="['/notes/',note]">
              {{note}}
            </a>
          </li>
        }
      </ul>
    </div>
  `,
  // styleUrl: './home.component.scss'
})

export class HomeComponent {
  @Input() noteList: any;
  private apiUrl = 'http://' + secrets.apiUrl + '/';

  constructor(private http: HttpClient) { }

  getPage(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'notes_list/');
  }

  ngOnInit() {
    this.getPage().subscribe(res => {
      this.noteList = JSON.parse(res).files
    })
  }
}
