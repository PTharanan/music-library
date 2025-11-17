import { Component, signal } from '@angular/core';
import { MusicList } from './features/music-list/music-list';

@Component({
  selector: 'app-root',
  imports: [MusicList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('music-frontend');
}
