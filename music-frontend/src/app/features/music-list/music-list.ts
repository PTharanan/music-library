import { Component, OnInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { Music, Music_model } from '../../core/services/music';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-music-list',
  imports: [CommonModule],
  templateUrl: './music-list.html',
  styleUrl: './music-list.css',
})
export class MusicList implements OnInit {
  musicList: Music_model[] = []
  constructor(private musicService: Music) { }

  @ViewChildren('audioPlayer') audioPlayers!: QueryList<ElementRef<HTMLAudioElement>>;
  private currentlyPlayingIndex: number | null = null;

  loadMusic(): void {
    this.musicService.getMusicList().subscribe(data => {
      this.musicList = data;
    });
  }

  ngOnInit(): void {
    this.loadMusic();
  }

  deleteMusic(id: number): void {
    if (confirm('Are you sure to delete this music?')) {
      this.musicService.deleteMusic(id).subscribe(() => {
        this.loadMusic();
      });
    }
  }

  onPlay(index: number): void {
    // Pause previously playing audio if any
    if (this.currentlyPlayingIndex !== null && this.currentlyPlayingIndex !== index) {
      const previousAudio = this.audioPlayers.toArray()[this.currentlyPlayingIndex];
      if (previousAudio && !previousAudio.nativeElement.paused) {
        previousAudio.nativeElement.pause();
      }
    }

    this.currentlyPlayingIndex = index;
  }
}
