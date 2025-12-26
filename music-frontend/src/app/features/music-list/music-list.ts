import { Component, OnInit, QueryList, ViewChildren, ViewChild, ElementRef } from '@angular/core';
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

  // user can upload same file
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // New properties for upload
  newMusicTitle: string = '';
  selectedFile: File | null = null;

  // is file uploading or not
  isUploading: boolean = false;

  isLoading = true;

  //Observe api
  Observeapi: string = 'Loading...';

  constructor(private musicService: Music) { }

  @ViewChildren('audioPlayer') audioPlayers!: QueryList<ElementRef<HTMLAudioElement>>;
  private currentlyPlayingIndex: number | null = null;

  ngOnInit(): void {
    this.loadMusic();
    // After 10s execute
    setTimeout(() => {
      // this.Observeapi = '⭮ Reload the page';
      this.Observeapi = 'Sever not found !';
    }, 10000);
  }

  loadMusic(): void {
    this.musicService.getMusicList().subscribe(data => {
      this.musicList = data;
      this.isLoading = false;
    });
  }

  deleteMusic(id: number): void {
    if (confirm('Are you sure to delete this music?')) {
      this.musicService.deleteMusic(id).subscribe(() => {
        this.loadMusic();
      });
    }
  }

  // At a time play one audio
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

    const maxSize = 5 * 1024 * 1024; //5MB 

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
    this.isUploading = true;

    // Title & file check
    if (!this.newMusicTitle || !this.selectedFile) {
      this.isUploading = false;
      alert('Please provide both title and audio file.');
      return;
    }

    // Duplicate title check
    const titleExists = this.musicList.some(
      music =>
        music.Title.toLowerCase().trim() === this.newMusicTitle.toLowerCase().trim()
    );

    if (titleExists) {
      this.isUploading = false;
      alert('This song title already exists. Please choose another title.');
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('Title', this.newMusicTitle);
    formData.append('File', this.selectedFile as File);

    // Upload
    this.musicService.uploadMusic(formData).subscribe({
      next: () => {
        this.isUploading = false;
        alert('Music uploaded successfully!');

        this.newMusicTitle = '';
        this.selectedFile = null;
        this.fileInput.nativeElement.value = '';

        this.loadMusic();
      },
      error: (err) => {
        this.isUploading = false;
        alert('Error uploading music.');
        console.error(err);
      }
    });
  }

}
