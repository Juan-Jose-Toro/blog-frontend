import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <ul class="">
      @for(note of noteList; track note) {
        <li>
          <a [routerLink]="['/notes/',note]">
            {{note}}
          </a>
        </li>
      }
    </ul>
  `,
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  @Input() noteList: any;
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getPage(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'notes/list/');
  }

  ngOnInit() {
    this.getPage().subscribe(res => {
      this.noteList = JSON.parse(res).files
    })
  }
}
