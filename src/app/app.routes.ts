import { Routes } from '@angular/router';
import { NoteComponent } from './note/note.component';
import { HomeComponent } from './home/home.component';
import { homedir } from 'os';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: "Home"
  },
  {
    path: 'notes/:name',
    component: NoteComponent,
    title: "Notes"
  }];
