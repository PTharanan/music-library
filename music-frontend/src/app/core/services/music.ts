import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Music_model {
  id: number;
  Title: string;
  File: string;
  Date: string;
}

@Injectable({
  providedIn: 'root',
})

export class Music {
  private apiUrl = environment.apiUrl;

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
