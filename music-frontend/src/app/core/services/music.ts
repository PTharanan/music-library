import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Music_model {
  id: number;
  Title: string;
  File: string;
  // google_drive_url: string;
}

@Injectable({
  providedIn: 'root',
})

export class Music {
  // private apiUrl = 'http://127.0.0.1:8000//api/music/';
  private apiUrl = 'https://tharanan.pythonanywhere.com//api/music/';

  constructor(private http: HttpClient) { }

  getMusicList(): Observable<Music_model[]> {
    return this.http.get<Music_model[]>(this.apiUrl)
  }

  uploadMusic(formData: FormData): Observable<Music_model> {
    return this.http.post<Music_model>(this.apiUrl, formData);
  }


  deleteMusic(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
