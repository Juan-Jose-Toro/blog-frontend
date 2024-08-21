import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterModule, ActivatedRoute } from '@angular/router';
import markdownit from 'markdown-it';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [RouterModule],
  template: `
    <a class="p-2 my-2 bg-yellow-300" [routerLink]="['/']">
      home
    </a>
    <div [innerHTML]="pageContent" class="max-w-screen-md mx-auto">
    </div>
  `,
  styleUrl: './note.component.scss'
})

export class NoteComponent {
  private md;
  private apiUrl = 'http://localhost:3000/';
  @Input() pageContent: any;
  route: ActivatedRoute = inject(ActivatedRoute)


  constructor(private http: HttpClient) {
    this.md = markdownit();
  }

  getPage(): Observable<any> {
    return this.http.get<any>(this.apiUrl + this.route.snapshot.params['name']);
  }

  ngOnInit() {
    this.getPage().subscribe(page => {
      console.log('page:', page)
      this.pageContent = this.md.render(page.result);
    })
  }
}


// 
// 
// @Injectable({ providedIn: 'root' })
// 
// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   template: `
//     <div [innerHTML]="pageContent" class="max-w-screen-md mx-auto">
//     </div>
//   `,
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   private md;
//   private apiUrl = 'http://localhost:3000/pure-components.md';
//   @Input() pageContent: any;
// 
//   constructor(private http: HttpClient) {
//     this.md = markdownit();
//   }
// 
//   getPage(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/`);
//   }
// 
//   ngOnInit() {
//     this.getPage().subscribe({
//       next: page => {
//         console.log('page:', page)
//         this.pageContent = this.md.render(page.result);
//       },
//     })
//   }
// }
