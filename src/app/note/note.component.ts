import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import markdownit from 'markdown-it';
// TODO: Using the modified vscode version instead, look into
//   why the other version did not work
import katex from '@vscode/markdown-it-katex';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="markdown-body">
      <a class="p-2 my-2 bg-yellow-300" [routerLink]="['/']">
        home
      </a>
      <div [innerHTML]="pageContent" class="max-w-screen-md mx-auto">
      </div>
    </div>
  `,
  // styleUrl: './note.component.scss'
})

export class NoteComponent {
  private md;
  private apiUrl = 'http://localhost:3000/';
  @Input() pageContent: any;
  route: ActivatedRoute = inject(ActivatedRoute)


  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    // TODO: For some reason the original guy that created this module does
    //   not allow us to import it without using require
    // require() here would try to dynamically load the package which errors
    //   why?
    this.md = markdownit().use(katex);
  }

  getPage(): Observable<any> {
    // These headers were not useful, better to put them on the backend
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    let body = { name: this.route.snapshot.params['name'] }
    return this.http.post<any>(
      this.apiUrl + 'notes/', body, options
    );
  }

  ngOnInit() {
    this.getPage().subscribe(page => {
      console.log('page:', page)
      let result = JSON.parse(page).result
      console.log("result to be rendered", result)
      console.log("testing:", JSON.stringify(result))
      this.pageContent = this.md.render(result);
      // this.pageContent = this.md.render('# Math Rulez! \n  $\\sqrt{3x-1}$')
      this.pageContent = this.sanitizer.bypassSecurityTrustHtml(this.pageContent)
      console.log('pageContent', this.pageContent)
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
