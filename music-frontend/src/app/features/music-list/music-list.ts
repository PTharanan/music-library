import { Component, OnInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { Music, Music_model } from '../../core/services/music';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-music-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './music-list.html',
  styleUrls: ['./music-list.css'],
})
export class MusicList implements OnInit {
  musicList: Music_model[] = [];

  // New properties for upload
  newMusicTitle: string = '';
  selectedFile: File | null = null;

  constructor(private musicService: Music) { }

  @ViewChildren('audioPlayer') audioPlayers!: QueryList<ElementRef<HTMLAudioElement>>;
  private currentlyPlayingIndex: number | null = null;

  ngOnInit(): void {
    this.loadMusic();
    console.log("Hello I'm Tharanan 🙃");
  }

  loadMusic(): void {
    this.musicService.getMusicList().subscribe(data => {
      this.musicList = data;
    });
  }

  deleteMusic(id: number): void {
    if (confirm('Are you sure to delete this music?')) {
      this.musicService.deleteMusic(id).subscribe(() => {
        this.loadMusic();
      });
    }
  }

  onPlay(index: number): void {
    if (this.currentlyPlayingIndex !== null && this.currentlyPlayingIndex !== index) {
      const previousAudio = this.audioPlayers.toArray()[this.currentlyPlayingIndex];
      if (previousAudio && !previousAudio.nativeElement.paused) {
        previousAudio.nativeElement.pause();
      }
    }
    this.currentlyPlayingIndex = index;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    const maxSize = 5 * 1024 * 1024;

    if (!file.type.startsWith('audio/')) {
      alert("Only audio files are allowed!");
      event.target.value = "";
      this.selectedFile = null;
      return;
    }

    if (file.size > maxSize) {
      alert("File size must be less than 5MB!");
      event.target.value = "";
      this.selectedFile = null;
      return;
    }

    this.selectedFile = file;
  }



  uploadMusic(): void {
    if (!this.newMusicTitle || !this.selectedFile) {
      alert('Please provide both title and audio file.');
      return;
    }

    const formData = new FormData();
    formData.append('Title', this.newMusicTitle);
    formData.append('File', this.selectedFile);

    this.musicService.uploadMusic(formData).subscribe({
      next: () => {
        alert('Music uploaded successfully!');
        this.newMusicTitle = '';
        this.selectedFile = null;
        this.loadMusic();
      },
      error: (err) => {
        alert('Error uploading music.');
        console.error(err);
      }
    });
  }
}
