import { HttpClient } from '@angular/common/http';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import markdownit from 'markdown-it';


@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div [innerHTML]="pageContent" class="max-w-screen-md mx-auto">
    </div>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private md;
  private apiUrl = 'http://localhost:3000';
  @Input() pageContent: any;

  constructor(private http: HttpClient) {
    this.md = markdownit();
  }

  getPage(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/`);
  }

  ngOnInit() {
    this.getPage().subscribe({
      next: page => {
        console.log('page:', page)
        this.pageContent = this.md.render(page.result);
      },
    })
  }
}
